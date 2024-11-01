
import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSigninAdminMutation } from '../../../service/admin';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginAdmAuth } from '../../../app/actions/authAdm';
import { useAppDispatch } from '../../../app/hook';

type Props = {}

const LoginAdmin = (props: Props) => {
    const navigate = useNavigate();
    const [signInMutation]  = useSigninAdminMutation();
    const dispatch = useAppDispatch()
    const signIn = async (username: string, password: string) => {
        try {
          const result = await signInMutation({
            name: username,
            password: password
          });
      
          if ('error' in result) {
            message.error('Sign in failed');
            // Handle login failure logic
          } else {
            const user = result.data;
            message.success('User signed in');
            // Handle login success logic
            dispatch(loginAdmAuth());
            navigate('/admin');
          }
        } catch (error) {
            message.error('Sign in failed');
          // Handle login failure logic
        }
      };

      const onFinish = (values: any) => {
        const { username, password } = values;
        signIn(username, password);
      };
  return (
    <div className='mx-auto w-1/4 h-screen '>
        <p className='font-bold text-3xl text-center py-5'>WELCOME BACK ADMIN</p>
    <Form
      name="normal_login"
      className="login-form mx-auto py-16"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="#">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item className='text-center'>
        <Button type="primary" htmlType="submit" className="login-form-button bg-blue-500 px-3">
          Log in
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}

export default LoginAdmin
