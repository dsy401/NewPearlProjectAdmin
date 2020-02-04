import {Table, Input, Popconfirm, Form, Button} from 'antd';
import React,{Fragment} from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {DeleteLocalClient, GetLocalClientByPageNumber, UpdateLocalClient} from "../../../api/api";
import {connect} from 'react-redux'
import LocalClientAddModal from "../../../components/UI/LocalClientAddModal/LocalClientAddModal";
const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    componentDidMount() {
        this.setState({
            loading: true
        })
        GetLocalClientByPageNumber(this.state.current_page_num).then(res=>{
            this.setState({
                loading: false
            },()=>{
                this.setState({
                    data:
                        res.data.data.map((s)=>{
                            return (
                                {name: s.name, phone:s.phone, address: s.address,email:s.email,key: s._id.$oid}
                            )
                        }),
                    total: res.data.total
                })
            })
        }).catch(err=>{
            this.setState({
                loading: false
            })
            alert("Server Error")
        })

    }

    componentWillUnmount = () => {
        this.setState = (state) =>{
            return;
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.localClientData !== this.props.localClientData){
            this.setState({
                data: nextProps.localClientData.map((s)=>{
                    return (
                        {name: s.name, phone:s.phone, address: s.address,email:s.email,key: s._id.$oid}
                    )
                })})
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            modalVisible: false,
            editingKey: '',
            loading: false,
            total: 1,
            current_page_num: 1
        };
        this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                editable: true,
            },
            {
                title: 'phone',
                dataIndex: 'phone',
                editable: true,
            },
            {
                title: 'address',
                dataIndex: 'address',
                editable: true,
            },
            {
                title: 'email',
                dataIndex: 'email',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        onClick={() => this.save(form, record.key)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Save
                                    </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                        <Fragment>
                            <a style={{marginRight: '10px'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                Edit
                            </a>
                            <Popconfirm title="Sure to Delete?" onConfirm={() =>this.DeleteHandler(record.key)}>
                                <a disabled={editingKey !== ''}>
                                    Delete
                                </a>
                            </Popconfirm>
                        </Fragment>
                    );
                },
            },
        ];
    }

    isEditing = record => record.key === this.state.editingKey;

    DeleteHandler = (id) =>{
        this.setState({loading:true})
        DeleteLocalClient(id).then(res=>{
            if (this.state.data.length === 1){
                this.setState({loading:false,current_page_num:this.state.current_page_num-1},()=>{
                    this.refreshPage()
                })
            }else{
                this.setState({loading:false},()=>{
                    this.refreshPage()
                })
            }

        }).catch(err=>{
            this.setState({loading:false})
            alert("delete Fail, Plz try it later")
        })
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };


    pageChange = (page,size) =>{
        this.setState({
            loading: true
        })
        GetLocalClientByPageNumber(page).then(res=>{
            this.setState({
                loading: false
            },()=>{
                this.setState({
                    data:
                        res.data.data.map((s)=>{
                            return (
                                {name: s.name, phone:s.phone, address: s.address,email:s.email,key: s._id.$oid}
                            )
                        }),
                    total: res.data.total,
                    current_page_num: page,
                    editingKey: '',
                })
            })
        }).catch(err=>{
            this.setState({
                loading: false
            })
            alert("Server Error")
        })
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const fdata = new FormData();
            fdata.append('name',row.name)
            fdata.append('phone',row.phone)
            fdata.append('address',row.address)
            fdata.append('email',row.email)
            this.setState({loading:true})
            UpdateLocalClient(key,fdata).then(res=>{
                this.setState({loading:false},()=>{
                    this.setState({
                        editingKey: ''
                    },()=>{
                        this.refreshPage()
                    });
                })

            }).catch(err=>{
                this.setState({loading:false})
                console.log(err)
            })
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }
    openLotteryAddModal = () =>{
        this.setState({modalVisible: true})
    }

    closeLotteryAddModal = () =>{
        this.setState({modalVisible:false})
    }


    refreshPage = () =>{

        this.setState({
            loading: true
        })
        GetLocalClientByPageNumber(this.state.current_page_num).then(res=>{
            this.setState({
                loading: false
            },()=>{
                this.setState({
                    data:
                        res.data.data.map((s)=>{
                            return (
                                {name: s.name, phone:s.phone, address: s.address,email:s.email,key: s._id.$oid}
                            )
                        }),
                    total: res.data.total,
                })
            })
        }).catch(err=>{
            this.setState({
                loading: false
            })
            alert("Server Error")
        })
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'gender' ? 'select' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });



        return (
            <EditableContext.Provider value={this.props.form}>
                <Button onClick={this.openLotteryAddModal} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
                </Button>
                <LocalClientAddModal refreshPage={this.refreshPage} closeModal={this.closeLotteryAddModal} visible={this.state.modalVisible}/>
                <Table
                    loading={this.state.loading}
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        defaultPageSize: 10,
                        onChange: this.pageChange,
                        total: this.state.total,
                        current: this.state.current_page_num
                    }}
                />
            </EditableContext.Provider>
        );
    }
}
const mapStateToProps = state => {
    return {
        localClientData: state.localClientReducer
    }
};

const LocalClientTable = Form.create()(connect(mapStateToProps)(EditableTable));

const LocalClient = (props) =>{
    return (
        <DashboardBody title={props.name}>
            <div>
                <LocalClientTable/>
            </div>
        </DashboardBody>
    )
}
export default LocalClient
