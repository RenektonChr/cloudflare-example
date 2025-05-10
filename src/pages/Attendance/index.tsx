import React, { useState } from 'react';
import { Card, Calendar, Badge, Modal, Form, Input, Row, Col, Statistic } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';

interface AttendanceRecord {
  date: string;
  status: 'normal' | 'late' | 'absent' | 'leave';
  checkIn?: string;
  checkOut?: string;
  note?: string;
}

const Attendance: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();

  // 模拟考勤数据
  const mockData: AttendanceRecord[] = [
    {
      date: '2024-03-10',
      status: 'normal',
      checkIn: '09:00',
      checkOut: '18:00',
    },
    {
      date: '2024-03-11',
      status: 'late',
      checkIn: '09:30',
      checkOut: '18:00',
    },
    {
      date: '2024-03-12',
      status: 'leave',
      note: '年假',
    },
  ];

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const record = mockData.find(item => item.date === dateStr);

    if (!record) return null;

    const statusMap = {
      normal: { status: 'success', text: '正常' },
      late: { status: 'warning', text: '迟到' },
      absent: { status: 'error', text: '缺勤' },
      leave: { status: 'default', text: '请假' },
    };

    const { status, text } = statusMap[record.status];

    return (
      <Badge status={status as any} text={text} />
    );
  };

  const handleSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      // TODO: 调用考勤记录API
      console.log('提交考勤记录', { date: selectedDate?.format('YYYY-MM-DD'), ...values });
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  // 统计信息
  const statistics = {
    total: 22,
    normal: 18,
    late: 2,
    absent: 1,
    leave: 1,
  };

  return (
    <div className="p-6">
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Statistic
              title={<span className="text-gray-600">本月出勤天数</span>}
              value={statistics.total}
              prefix={<ClockCircleOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Statistic
              title={<span className="text-gray-600">正常出勤</span>}
              value={statistics.normal}
              prefix={<CheckCircleOutlined className="text-green-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Statistic
              title={<span className="text-gray-600">迟到次数</span>}
              value={statistics.late}
              prefix={<ClockCircleOutlined className="text-yellow-500" />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Statistic
              title={<span className="text-gray-600">缺勤次数</span>}
              value={statistics.absent}
              prefix={<CloseCircleOutlined className="text-red-500" />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title={<span className="text-lg font-semibold">考勤日历</span>}
        className="shadow-md"
      >
        <Calendar
          dateCellRender={dateCellRender}
          onSelect={handleSelect}
          className="attendance-calendar"
        />
      </Card>

      <Modal
        title={<span className="text-lg font-semibold">考勤记录</span>}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        className="attendance-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="checkIn"
            label={<span className="text-gray-700">签到时间</span>}
            rules={[{ required: true, message: '请输入签到时间' }]}
          >
            <Input type="time" className="input-field" />
          </Form.Item>
          <Form.Item
            name="checkOut"
            label={<span className="text-gray-700">签退时间</span>}
            rules={[{ required: true, message: '请输入签退时间' }]}
          >
            <Input type="time" className="input-field" />
          </Form.Item>
          <Form.Item
            name="note"
            label={<span className="text-gray-700">备注</span>}
          >
            <Input.TextArea rows={4} className="input-field" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Attendance; 