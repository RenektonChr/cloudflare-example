import React, { useState } from 'react';
import { Card, Table, Tag, Button, Space, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface ApprovalItem {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  applicant: string;
  createTime: string;
}

const Approval: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<ApprovalItem> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '申请人',
      dataIndex: 'applicant',
      key: 'applicant',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          pending: { color: 'processing', text: '待审批' },
          approved: { color: 'success', text: '已通过' },
          rejected: { color: 'error', text: '已拒绝' },
        };
        const { color, text } = statusMap[status as keyof typeof statusMap];
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleApprove(record)}>审批</Button>
          <Button type="link" danger onClick={() => handleReject(record)}>拒绝</Button>
        </Space>
      ),
    },
  ];

  const mockData: ApprovalItem[] = [
    {
      id: '1',
      title: '请假申请',
      type: '请假',
      status: 'pending',
      applicant: '张三',
      createTime: '2024-03-10 10:00:00',
    },
    {
      id: '2',
      title: '报销申请',
      type: '报销',
      status: 'approved',
      applicant: '李四',
      createTime: '2024-03-09 15:30:00',
    },
  ];

  const handleApprove = (record: ApprovalItem) => {
    Modal.confirm({
      title: '确认审批',
      content: `确定通过"${record.title}"的申请吗？`,
      onOk: () => {
        // TODO: 调用审批API
        console.log('审批通过', record);
      },
    });
  };

  const handleReject = (record: ApprovalItem) => {
    Modal.confirm({
      title: '确认拒绝',
      content: `确定拒绝"${record.title}"的申请吗？`,
      onOk: () => {
        // TODO: 调用拒绝API
        console.log('审批拒绝', record);
      },
    });
  };

  const handleCreate = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      // TODO: 调用创建API
      console.log('创建申请', values);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <div>
      <Card
        title="审批管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建申请
          </Button>
        }
      >
        <Table columns={columns} dataSource={mockData} rowKey="id" />
      </Card>

      <Modal
        title="新建申请"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select>
              <Select.Option value="leave">请假</Select.Option>
              <Select.Option value="expense">报销</Select.Option>
              <Select.Option value="other">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Approval; 