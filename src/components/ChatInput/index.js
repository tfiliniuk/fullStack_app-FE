import React, { Fragment } from "react";
import { Button, Input } from "antd";
import { UploadField } from "@navjobs/upload";

import { UploadFiles } from "components";

const { TextArea } = Input;


const ChatInput = ({
  value,
  setValue,
  handleSendMessage,
  sendMessage,
  onSelectFiles,
  attachments,
  removeAttachment
}) => {
  return (
    <Fragment>
      <div className="chat-input">
        <div className="chat-input-text">
        <TextArea
            onChange={e => setValue(e.target.value)}
            onKeyUp={handleSendMessage}
            size="large"
            placeholder="Введите текст сообщения…"
            value={value}
            autoSize={{ minRows: 1, maxRows: 6 }}
          />
          <Button
            onClick={sendMessage}
            type="link"
            shape="circle"
            icon="check-circle"
          />
        </div>
        <div className="chat-input__actions">
          <UploadField
            onFiles={onSelectFiles}
            containerProps={{
              className: "chat-input__actions-upload-btn"
            }}
            uploadProps={{
              accept: ".jpg,.jpeg,.png,.gif,.bmp",
              multiple: "multiple"
            }}
          >
            <Button type="link" shape="circle" icon="camera" />
          </UploadField>
        </div>
        {attachments.length > 0 && (
          <div className="chat-input__attachments">
            <UploadFiles
              removeAttachment={removeAttachment}
              attachments={attachments}
            />
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default ChatInput;
