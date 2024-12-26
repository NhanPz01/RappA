import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminService from '../services/AdminService';
import AuthService from '../services/AuthService';
import { Table, Select, Input, message, Button} from 'antd';
import * as Components from '../assets/Components';

const { Option } = Select;
const { Search } = Input;

interface User {
    username: string;
    role: string;
}

interface Record {
    id: string;
    title: string;
    content: string;
    username: string;
}

const Admin = () => {
    const [selectedOption, setSelectedOption] = useState('users');
    const [data, setData] = useState<User[] | Record[]>([]);
    const [search, setSearch] = useState('');
    const [searchOption, setSearchOption] = useState('username');
    const navigate = useNavigate();

    useEffect(() => {
        checkAdminRole();
        fetchData();
    }, [selectedOption]);

    const checkAdminRole = () => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.role !== 'ROLE_ADMIN') {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('user');
            navigate('/login');
            await AuthService.logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const fetchData = async () => {
        try {
            if (selectedOption === 'users') {
                const users = await AdminService.getUsers();
                setData(users);
            } else {
                const records = await AdminService.getRecords();
                setData(records);
            }
        } catch (error) {
            message.error('Failed to fetch data');
        }
    };

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const handleDelete = async (key: string | number) => {
        try {
            if (selectedOption === 'users') {
                await AdminService.deleteUser(key as string);
            } else {
                await AdminService.deleteRecord(key as number);
            }
            fetchData();
            message.success('Deleted successfully');
        } catch (error) {
            message.error('Failed to delete');
        }
    };

    const filteredData = data.filter((item): item is User | Record => {
        if (selectedOption === 'users') {
            return 'role' in item && (
                searchOption === 'username' || searchOption === 'role' ?
                    item[searchOption as keyof User].toLowerCase().includes(search.toLowerCase()) :
                    false
            );
        } else {
            return 'title' in item && (
                searchOption === 'title' || searchOption === 'content' || searchOption === 'username' ?
                    item[searchOption as keyof Record].toLowerCase().includes(search.toLowerCase()) :
                    false
            );
        }
    });

    const columns = selectedOption === 'users' ? [
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: User | Record) => (
                <span>
                    <Button onClick={() => handleDelete((record as User).username)} danger>Delete</Button>
                </span>
            ),
        },
    ] : [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Content', dataIndex: 'content', key: 'content' },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: User | Record) => (
                <span>
                    <Button onClick={() => handleDelete((record as Record).id)} danger>Delete</Button>
                </span>
            ),
        },
    ];

    return (
        <div style={{ height: '100vh', width: '100vw', padding: 10}}>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between',padding: 5}}>
                <Select defaultValue="users" onChange={value => setSelectedOption(value)} style={{ marginBottom: 20 }}>
                    <Option value="users">Users</Option>
                    <Option value="records">Records</Option>
                </Select>
                <div><Select defaultValue="username" onChange={value => setSearchOption(value)} style={{ marginBottom: 20, width: 200 }}>
                    {selectedOption === 'users' ? (
                        <>
                            <Option value="username">Username</Option>
                            <Option value="role">Role</Option>
                        </>
                    ) : (
                        <>
                            <Option value="title">Title</Option>
                            <Option value="content">Content</Option>
                            <Option value="username">Username</Option>
                        </>
                    )}
                </Select>
                <Search placeholder="Search" onSearch={handleSearch} style={{ marginBottom: 20, width: 200 }} /></div>
                <Components.Button onClick = {()=>{handleLogout()}}>Đăng xuất</Components.Button>
            </div>
            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey={record =>
                    selectedOption === 'users'
                        ? (record as User).username
                        : (record as Record).id
                }
            />
        </div>
    );
};

export default Admin;