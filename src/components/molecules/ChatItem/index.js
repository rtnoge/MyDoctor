import React from "react";
import TextIn from "./TextIn";
import TextOut from "./TextOut";

const ChatItem = ({ isOut, text, date, pic }) => {
  if (isOut) {
    return <TextOut text={text} date={date} />;
  }
  return <TextIn text={text} date={date} pic={pic} />;
};

export default ChatItem;