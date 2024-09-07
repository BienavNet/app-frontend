import { useState } from "react";
import { Tooltip, Text } from "@rneui/themed";
import { truncateText } from "../../../src/utils/functiones/functions";
import { ColorItem } from "../../styles/StylesGlobal";

const TooltipText = ({ text, truncateLength = 7 }) => {
 
  const [visible, setVisible] = useState(false);
  const truncatedText = truncateText(text, truncateLength);

  return (
    <Tooltip
      visible={visible}
      onOpen={() => setVisible(true)}
      onClose={() => setVisible(false)}
      popover={<Text  style={{
        color: ColorItem.DeepFir,
    }}>{text}</Text>} 
      animationType="fade"
      containerStyle={

         {
          backgroundColor: "lightgrey",
          width: 300, 
       }
      }
    >
        <Text 
        style={{
            fontSize: 18,
            color: "#999999",
            textAlign: "center",
        }}
        
        >{truncatedText}</Text>
    </Tooltip>
  );
};

export default TooltipText;
