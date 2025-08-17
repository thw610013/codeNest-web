import React, { type ReactNode, useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
    children,
    itemClassName = "",
}) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    smooth?: boolean;
    pinAtCenter?: boolean;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = "",
    // 是否启用 Lenis 平滑滚动。
    // •	true → 平滑过渡，像 iOS 惯性滚动；
    // •	false → 原生滚动（直接跟随鼠标滚轮）。
    smooth = false,
    pinAtCenter = true,
    // itemDistance
    // •	卡片之间的基础间距（单位 px）。
    // •	越大 → 卡片之间分得更开，滚动距离也变长。
    itemDistance = 500,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = "1%",
    scaleEndPosition = "5%",
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    // •	模糊效果的强度（单位 px）。
    // •	只对“压在堆叠下面”的卡片生效。
    // •	例如：3 → 越往下的卡片越模糊，突出顶层卡片
    blurAmount = 5,
    onStackComplete,
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);
    const lenisRef = useRef<Lenis | null>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const lastTransformsRef = useRef(new Map<number, any>()); // eslint-disable-line @typescript-eslint/no-explicit-any
    const isUpdatingRef = useRef(false);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value as string);
    }, []);

    const updateCardTransforms = useCallback(() => {
        const scroller = scrollerRef.current;
        if (!scroller || !cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const scrollTop = scroller.scrollTop;
        const containerHeight = scroller.clientHeight;
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
        const endElement = scroller.querySelector('.scroll-stack-end') as HTMLElement;
        const endElementTop = endElement ? endElement.offsetTop : 0;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = card.offsetTop;
            const cardHeight = card.offsetHeight;
            const stackPinPos = pinAtCenter ? (containerHeight - cardHeight) / 2 : stackPositionPx;

            const triggerStart = cardTop - stackPinPos - (itemStackDistance * i);
            const triggerEnd = cardTop - scaleEndPositionPx;
            const pinStart = cardTop - stackPinPos - (itemStackDistance * i);
            const pinEnd = endElementTop - containerHeight / 2;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + (i * itemScale);
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cardsRef.current.length; j++) {
                    const jCard = cardsRef.current[j];
                    const jCardTop = jCard.offsetTop;
                    const jCardHeight = jCard.offsetHeight;
                    const jStackPinPos = pinAtCenter ? (containerHeight - jCardHeight) / 2 : stackPositionPx;
                    const jTriggerStart = jCardTop - jStackPinPos - (itemStackDistance * j);
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop + stackPinPos + (itemStackDistance * i);
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop + stackPinPos + (itemStackDistance * i);
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged = !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            itemScale,
            itemStackDistance,
            stackPosition,
            scaleEndPosition,
            baseScale,
            rotationAmount,
            blurAmount,
            onStackComplete,
            calculateProgress,
            parsePercentage,
        ]);

    const handleScroll = useCallback(() => {
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupLenis = useCallback(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const lenis = new Lenis({
            wrapper: scroller,
            content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
            gestureOrientation: 'vertical',
            wheelMultiplier: 1,
            lerp: 0.1,
            syncTouch: true,
            syncTouchLerp: 0.075,
        });

        lenis.on('scroll', handleScroll);

        const raf = (time: number) => {
            lenis.raf(time);
            animationFrameRef.current = requestAnimationFrame(raf);
        };
        animationFrameRef.current = requestAnimationFrame(raf);

        lenisRef.current = lenis;
        return lenis;
    }, [handleScroll]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card")) as HTMLElement[];
        cardsRef.current = cards;
        const transformsCache = lastTransformsRef.current;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            card.style.transform = 'translateZ(0)';
            card.style.webkitTransform = 'translateZ(0)';
            card.style.perspective = '1000px';
            card.style.webkitPerspective = '1000px';
        });

        if (smooth) {
            setupLenis();
        } else {
            scroller.addEventListener('scroll', handleScroll, { passive: true });
        }

        updateCardTransforms();

        return () => {
            if (smooth) {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                if (lenisRef.current) {
                    lenisRef.current.destroy();
                }
            } else if (scroller) {
                scroller.removeEventListener('scroll', handleScroll as EventListener);
            }
            stackCompletedRef.current = false;
            cardsRef.current = [];
            transformsCache.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        scaleDuration,
        rotationAmount,
        blurAmount,
        onStackComplete,
        setupLenis,
        updateCardTransforms,
        smooth,
        handleScroll,
    ]);

    return (
        <div
            className={`scroll-stack-scroller ${className}`.trim()}
            ref={scrollerRef}
        >
            <div className="scroll-stack-inner">
                {children}
                {/* Spacer so the last pin can release cleanly */}
                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;
