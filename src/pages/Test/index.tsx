import {
  Bubble,
  Conversations,
  Sender,
  Suggestion,
  ThoughtChain,
  XProvider,
} from '@ant-design/x';
import { Avatar, Card, Divider, Flex } from 'antd';
import React from 'react';

import {
  AlipayCircleOutlined,
  GithubOutlined,
  UserOutlined,
} from '@ant-design/icons';

export default () => {
  const [value, setValue] = React.useState('');

  return (
    <>
      <Card>
        <XProvider direction={'ltr'}>
          <Flex style={{ height: 500 }} gap={12}>
            <Conversations
              style={{ width: 200 }}
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: 'Conversation - 1',
                  icon: <GithubOutlined />,
                },
                {
                  key: '2',
                  label: 'Conversation - 2',
                  icon: <AlipayCircleOutlined />,
                },
              ]}
            />
            <Divider type="vertical" style={{ height: '100%' }} />
            <Flex vertical style={{ flex: 1 }} gap={8}>
              <Bubble.List
                style={{ flex: 1 }}
                items={[
                  {
                    key: '1',
                    placement: 'end',
                    content: 'Hello Ant Design X!',
                    avatar: { icon: <UserOutlined /> },
                  },
                  {
                    key: '2',
                    content: 'Hello World!',
                    avatar: (
                      <Avatar
                        src={
                          'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp'
                        }
                      />
                    ),
                  },
                ]}
              />
              <Suggestion
                items={[{ label: 'Write a report', value: 'report' }]}
              >
                {({ onTrigger, onKeyDown }) => {
                  return (
                    <Sender
                      value={value}
                      onChange={(nextVal) => {
                        if (nextVal === '/') {
                          onTrigger();
                        } else if (!nextVal) {
                          onTrigger(false);
                        }
                        setValue(nextVal);
                      }}
                      onKeyDown={onKeyDown}
                      placeholder='Type "/" to trigger suggestion'
                    />
                  );
                }}
              </Suggestion>
            </Flex>
          </Flex>
          <ThoughtChain />
        </XProvider>
      </Card>
    </>
  );
};
