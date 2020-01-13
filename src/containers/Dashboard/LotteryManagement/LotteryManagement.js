import {Table, Input, Popconfirm, Form, Button, Select} from 'antd';
import React from 'react'
import DashboardBody from "../../../components/common/DashboardBody/DashboardBody";
import {DeleteLottery, GetLottery,UpdateLottery} from "../../../api/api";
import Aux from "../../../hoc/Aux";
import LotteryAddModal from "../../../components/UI/LotteryAddModal/LotteryAddModal";
import {connect} from 'react-redux'
const { Option } = Select;
const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'select') {
            return (
                <Select>
                    <Option value="0">male</Option>
                    <Option value="1">female</Option>
                </Select>
            );
        }
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

    componentWillUnmount =()=> {
        this.setState = (state) =>{
            return;
        }
    }


    componentDidMount() {
        this.setState({
            loading: true
        })
        GetLottery().then(res=>{
            this.setState({
                loading: false
            },()=>{
                this.setState({data:
                        res.data.map((s)=>{
                            return (
                                {name: s.name, phone:s.phone, gender: s.gender,key: s._id.$oid}
                            )
                        })
                })
            })
        }).catch(err=>{
            this.setState({
                loading: false
            })
            alert("Server Error")
        })

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.lotteryData !== this.props.lotteryData){
            this.setState({
                data: nextProps.lotteryData.map((s)=>{
                    return (
                        {name: s.name, phone:s.phone, gender: s.gender,key: s._id.$oid}
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
            loading: false
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
                title: 'gender',
                dataIndex: 'gender',
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
                        <Aux>
                            <a style={{marginRight: '10px'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                Edit
                            </a>
                            <Popconfirm title="Sure to Delete?" onConfirm={() =>this.DeleteHandler(record.key)}>
                                <a disabled={editingKey !== ''}>
                                    Delete
                                </a>
                            </Popconfirm>
                        </Aux>
                    );
                },
            },
        ];
    }

    isEditing = record => record.key === this.state.editingKey;

    DeleteHandler = (id) =>{
        this.setState({loading:true})
        DeleteLottery(id).then(res=>{
            this.setState({loading:false},()=>{
                this.setState({
                    data: res.data.map((s)=>{
                        return (
                            {name: s.name, phone:s.phone, gender: s.gender,key: s._id.$oid_id}
                        )
                    })
                })
            })

        }).catch(err=>{
            this.setState({loading:false})
            alert("delete Fail, Plz try it later")
        })
    }

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const fdata = new FormData();
            fdata.append('name',row.name)
            fdata.append('phone',row.phone)
            fdata.append('gender',row.gender)
            this.setState({loading:true})
            UpdateLottery(key,fdata).then(res=>{
                this.setState({loading:false},()=>{
                    this.setState({
                        data: res.data.map((s)=>{
                            return (
                                {name: s.name, phone:s.phone, gender: s.gender,key: s._id.$oid}
                            )
                        }),
                        editingKey: ''
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
                <LotteryAddModal closeModal={this.closeLotteryAddModal} visible={this.state.modalVisible}/>
                <Table
                    loading={this.state.loading}
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}
const mapStateToProps = state => {
    return {
        lotteryData: state.lotteryReducer
    }
};

const LotteryTable = Form.create()(connect(mapStateToProps)(EditableTable));

const LotteryManagement = (props) =>{
    return (
        <DashboardBody title={props.name}>
            <div>
                <LotteryTable/>
            </div>
        </DashboardBody>
    )
}
export default LotteryManagement
