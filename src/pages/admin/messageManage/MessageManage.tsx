// 留言管理
import { Flex } from "antd";
import AdminMessageTable from "./components/AdminMessageTable";

const MessageManage = () => {
    return (
        <div>
            <Flex vertical gap={16}>
                <AdminMessageTable />
            </Flex>
        </div>
    );
};

export default MessageManage;