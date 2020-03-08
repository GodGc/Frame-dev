import React, { Component } from 'react';
import { message, Upload, Icon, Modal, Button } from 'antd';
import styles from './UploadImgCheck.less';
import {uploadImg} from '../../config/api'
// import { connect } from 'dva';

class UploadImgCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            imgList: [],
            pic: [],
        };
        // debugger
        const { value } = this.props;
        if (value) { // 修改
            this.state.pic = [{
                uid: Math.random(),
                url: value,
            }]
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
    };

    handleBeforeUpload = (file)=> {
        // this.getRules(file);
        // //限制图片 格式、size、分辨率
        // const fileType = file.type.split('/')[1].toLocaleLowerCase()
        // const isJPG = file.typeRules.includes('jpg')
        // if (isJPG) {
        //     file.typeRules.push('jpeg')
        // }
        // const isImage = file.typeRules.includes(fileType)
        // if (!isImage) {//图片格式校验
        //     Modal.error({
        //         title: `只能上传${file.typeRules.join('、').toLocaleUpperCase()}格式的图片~`,
        //     });
        //     return false;
        // }
        // const isSize = file.size < file.sizeRules;//图片大小校验
        // if (!isSize) {
        //     Modal.error({
        //         title: `超过${file.sizeRules / 1024 / 1024}KB限制，不允许上传~`,
        //     });
        //     return false;
        // }
        return isImage && isSize && this.checkImageWH(file);
    };

    //获取图片上传规则
    // getRules(file) {
    //     const { extension, height, size, width } = this.props.rules
    //     file.typeRules = extension
    //     file.widthRules = width
    //     file.heightRules = height
    //     file.sizeRules = size
    // }

    //返回一个 promise：检测通过则返回resolve；失败则返回reject，并阻止图片上传
    checkImageWH(file) {
        return new Promise(function(resolve, reject) {
        let filereader = new FileReader();
        filereader.onload = e => {
            let src = e.target.result;
            const image = new Image();
            image.onload = function() {
                // 获取图片的宽高，并存放到file对象中
                file.width = this.width;
                file.height = this.height;
                let isWidth = this.width === file.widthRules;
                let isHeight = this.height === file.heightRules;
                if (isWidth && isHeight) { // 校验图片尺寸
                    resolve();
                }else {
                    if (!isWidth) {
                        Modal.error({
                            title: `图片宽度不满足${file.widthRules}限制，不允许上传~`,
                        });
                    }
                    if (!isHeight) {
                        Modal.error({
                            title: `图片高度不满足${file.heightRules}限制，不允许上传~`,
                        });
                    }
                    reject();
                }
            };
            image.onerror = reject;
            image.src = src;
        };
        filereader.readAsDataURL(file);
        });
    }

    //上传图片
    handleChange(info) {
        // info['file'] 是当前正在上传的 单个 img
        // info['fileList'] 是已上传的全部 img 列表
        if (info.file.status === 'uploading') {
            this.setState({
                pic: [info.file]
            });
            return;
        } else if (info.file.status === 'done') {
            if (info.file.response.status == 200) {
                message.success(info.file.response.msg);
                info.file.thumbUrl = info.file.response.result.pic_path
                this.setState({
                    pic: [info.file],
                  });
                //   console.log('here?',info.file.response.result.pic_path)
                this.props.onChange(info.file.response.result.pic_path)
            } else {
                this.setState({
                    pic: [],
                });
                message.error(info.file.response.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        } else if (info.file.status === 'removed') {
            this.setState({
                pic: [],
            });
            this.props.onChange('')
        }
    };

    render() {
        const { previewVisible, previewImage } = this.state; //  从 state 中拿数据
        const { rules } = this.props;
        const props = {
            name: 'image',
            action: uploadImg ,
        };

        return (
            <div>
                <div className={styles.createForm}>
                    <Upload
                        {...props}
                        data={{ rules: JSON.stringify(rules) }}
                        // listType="picture-card"
                        fileList={this.state.pic}
                        onPreview={this.handlePreview} // 点击图片缩略图，进行预览
                        // beforeUpload={(e)=>this.handleBeforeUpload(e)} // 上传之前，对图片的格式做校验，并获取图片的宽高
                        onChange={(e)=>this.handleChange(e)} // 每次上传图片时，都会触发这个方法
                    >
                        {this.state.pic.length === 1 ?  null : (
                            <div>
                                {/* <Icon type="plus" />
                                <div className="ant-upload-text">Upload</div> */}
                                <Button style={{width:'200px',height:'70px',marginBottom:'10px'}}>
                                    <Icon type="upload" />
                                    <div className="ant-upload-text"></div>
                                </Button>
                            </div>
                        )}
                    </Upload>
                </div>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div> 
        );
    }
}

const MapStateToProps = (state) => ({
    auth: state.auth,
});

// export default connect(MapStateToProps, null, null, { withRef: true })(UploadImgCheck);
export default UploadImgCheck