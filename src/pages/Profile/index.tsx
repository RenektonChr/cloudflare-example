import React, { useState } from 'react';
import { Card, Avatar, Form, Input, Button, Upload, message, Tabs, List, Tag } from 'antd';
import { UserOutlined, UploadOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

interface UserProfile {
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  location: string;
  bio: string;
}

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 模拟用户数据
  const userProfile: UserProfile = {
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    department: '技术部',
    position: '前端工程师',
    location: '北京市朝阳区',
    bio: '热爱技术，热爱生活',
  };

  // 模拟最近活动数据
  const recentActivities = [
    {
      id: 1,
      title: '提交了请假申请',
      time: '2024-03-10 10:00:00',
      type: 'approval',
    },
    {
      id: 2,
      title: '完成了项目文档',
      time: '2024-03-09 15:30:00',
      type: 'task',
    },
    {
      id: 3,
      title: '参加了部门会议',
      time: '2024-03-08 14:00:00',
      type: 'meeting',
    },
  ];

  const handleSubmit = (values: any) => {
    setLoading(true);
    // TODO: 调用更新API
    setTimeout(() => {
      console.log('更新个人信息', values);
      message.success('个人信息更新成功');
      setLoading(false);
    }, 1000);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本信息',
      children: (
        <Form
          form={form}
          layout="vertical"
          initialValues={userProfile}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="avatar"
            label="头像"
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话"
            rules={[{ required: true, message: '请输入电话' }]}
          >
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item
            name="location"
            label="所在地"
          >
            <Input prefix={<EnvironmentOutlined />} />
          </Form.Item>
          <Form.Item
            name="bio"
            label="个人简介"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存修改
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: '最近活动',
      children: (
        <List
          itemLayout="horizontal"
          dataSource={recentActivities}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.time}
              />
              <Tag color={
                item.type === 'approval' ? 'blue' :
                item.type === 'task' ? 'green' :
                'purple'
              }>
                {item.type === 'approval' ? '审批' :
                 item.type === 'task' ? '任务' :
                 '会议'}
              </Tag>
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={userProfile.avatar}
          />
          <h2 style={{ marginTop: 16 }}>{userProfile.name}</h2>
          <p>{userProfile.department} - {userProfile.position}</p>
        </div>
        <Tabs defaultActiveKey="1" items={items} />
      </Card>
    </div>
  );
};

export default Profile; 