import React, { PureComponent } from 'react'
import { connect, Link } from 'umi'
import { Page } from 'components'
import List from './components/List'

@connect(({ users, loading, dispatch }) => ({
  users,
  loading,
  dispatch,
}))

class Users extends PureComponent {

  get listProps() {
    const { users, loading } = this.props
    const { list, pagination } = users
    const { query, pathname } = location
    return {
      pagination,
      dataSource: list,
      loading:
        loading.effects['users/query'] || loading.effects['users/create'],
      onChange(page) {
        history.push({
          pathname,
          search: stringify({
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          }),
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <List {...this.listProps} dispatch={this.props.dispatch} />
      </Page>
      
    )
  }
}

export default Users
