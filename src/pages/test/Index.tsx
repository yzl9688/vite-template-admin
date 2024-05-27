import CheckBtnAuth from "@/components/CheckBtnAuth";
import { Button } from "antd";

const TestIndex: React.FC = () => {
  return (
    <div>
      <CheckBtnAuth permission="add">
        <Button>添加</Button>
      </CheckBtnAuth>
      <CheckBtnAuth permission="edit">
        <Button>编辑</Button>
      </CheckBtnAuth>
      <CheckBtnAuth permission="del">
        <Button>删除</Button>
      </CheckBtnAuth>
    </div>
  );
};

export default TestIndex;
