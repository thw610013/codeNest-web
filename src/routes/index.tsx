import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import HeaderOnlyLayout from '../components/HeaderOnlyLayout';
import Home from '../pages/home/Home';
import Tools from '../pages/tools/Tools';
import QuestionBank from '../pages/questionBank/QuestionBank';
import Articles from '../pages/articles/Articles';
import About from '../pages/about/About';
import Wallpaper from '../pages/wallpaper/Wallpaper';
import MessageBoard from '../pages/messageBoard/MessageBoard';
import ArticleDetails from '../pages/articles/articleDetails/ArticleDetails';
import ToolDetails from '../pages/tools/toolDetails/ToolDetails';
import Questions from '../pages/questionBank/questions/Questions';
import QuestionDetails from '../pages/questionBank/questions/questionDetails/QuestionDetails';
import AdminLayout from '../pages/admin/components/AdminLayout';
import AdminManage from '../pages/admin/adminManage/AdminManage';
import ArticleManage from '../pages/admin/articleManage/Articlemanage';

export default function AppRoutes() {
    return (
        <Routes>
            {/* 首页使用仅包含顶部导航的布局，便于实现全屏动画 */}
            <Route path="/" element={<HeaderOnlyLayout />}>
                <Route index element={<Home />} />
            </Route>

            {/* 其他页面使用完整布局 */}
            <Route path="/" element={<Layout />}>
                <Route path="tools" element={<Tools />} />
                <Route path="tools/:id" element={<ToolDetails />} />
                <Route path="questionbank" element={<QuestionBank />} />
                <Route path="questionbank/questions/:id" element={<Questions />} />
                <Route path="questionbank/questiondetails/:id" element={<QuestionDetails />} />
                <Route path="articles" element={<Articles />} />
                <Route path="articles/:id" element={<ArticleDetails />} />
                <Route path="wallpaper" element={<Wallpaper />} />
                <Route path="messageboard" element={<MessageBoard />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

            <Route path="/admin/manage" element={<AdminLayout />}>
                <Route index element={<AdminManage />} />
                <Route path="/admin/manage/article" element={<ArticleManage />} />
            </Route>
        </Routes>
    );
}