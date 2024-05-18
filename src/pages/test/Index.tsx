import CheckBtnAuth from "@/components/CheckBtnAuth";
import { useGlobalStore } from "@/stores";
import { Button, Select } from "antd";
import { useState } from "react";

const TestIndex: React.FC = () => {
  const [role, setRole] = useGlobalStore((state) => [
    state.role,
    state.setRole,
  ]);
  const [currentRole, setCurrentRole] = useState(role);

  return (
    <div>
      <div>
        设置角色：
        <Select
          value={currentRole}
          className="w-[200px] mr-2"
          allowClear
          options={[
            { label: "role1", value: "role1" },
            { label: "role2", value: "role2" },
          ]}
          onSelect={(val) => {
            setCurrentRole(val);
          }}
          onClear={() => {
            setCurrentRole("");
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            setRole(currentRole as string);
          }}>
          保存
        </Button>
      </div>
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
