import { PlusOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import { Button, notification, Checkbox } from 'antd'
import React, { useRef } from 'react'
import { Link } from 'umi'
import { t } from '@lingui/macro'
import { history } from 'umi'

export const UsersColumns = [
  {
    title: t`Email`,
    dataIndex: 'Email',
    fixed: 'left',
    width: 60,
  },
  
  {
    title: t`Name`,
    dataIndex: 'Name',
    width: 40,
    
  },
  {
    title: t`User Group`,
    dataIndex: 'UserGroupCode',
    width: 40,
  },
  {
    title: t`System Code`,
    dataIndex: 'FirebaseUid',
    width: 80,
    hideInSearch: true,
  },
  {
    title: t`Operation`,
    key: 'operation',
    fixed: 'right',
    width: '8%',
    hideInSearch: true,
    render: (record) => (
      <Link to={`userlist/${record.FirebaseUid}`}>{t`View & Edit`}</Link>
    ),
  },
]

export default function List({
  pagination,
  dataSource,
  loading,
  onChange,
  dispatch,
}) {
  const actionRef = useRef()
  return (
    <>
      <ProTable
        {...{ pagination, loading, onChange, dataSource }}
        scroll={{ x: 1300, y: 2400 }}
        actionRef={actionRef}
        columns={UsersColumns}
        request={async (params = {}, sort, filter) => {
          const { Email, Name, UserGroupCode } = params
          if (params.FirebaseUid) {
            dispatch({
              type: 'users/queryByCode',
              payload: {
                FirebaseUid: params.FirebaseUid,
                page: params.current,
                pageSize: params.pageSize,
              },
            })

            return {
              data: dataSource,
              success: true,
              total: dataSource.length,
            }
          }

          Email || Name || UserGroupCode
            ? dispatch({
                type: 'users/queryByDescription',
                payload: {
                  Name: params.Name,
                  Email: params.Email,
                  UserGroupCode: params.UserGroupCode,
                  page: params.current,
                  pageSize: params.pageSize,
                },
              })
            : dispatch({
                type: 'users/query',
                payload: { page: params.current, pageSize: params.pageSize },
              })

          return {
            data: dataSource,
            success: true,
            total: dataSource.length,
          }
        }}
        rowKey="FirebaseUid"
        search={{ labelWidth: 'auto' }}
        dateFormatter="string"
        headerTitle="Users"
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={() => {
              history.push({ pathname: 'userlist/adduser' })
            }}
          >
            Add New User
          </Button>,
        ]}
      />
    </>
  )
}
