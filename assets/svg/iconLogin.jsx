import Svg, {
  LinearGradient,
  Stop,
  Circle,
  Path,
  G,
  Use,
  Defs,
  Ellipse,
} from "react-native-svg"

import { Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

export const SvgLogin = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="40 8 300 10"
    width={screenWidth}
    height={screenWidth - 100}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        fill="#D6DEDE"
        d="M429.615 164.257c-23.601 98.747-164.363 201.917-260.578 7.98-59.605-77.305-110.101 78.969-190.223-25.514C-97.361-105.279 124.565-16.64 205.776-22.872c98.683-7.572 218.171-75.413 223.839 187.129Z"
      />
    </G>
    <Path
      fill="#3379E2"
      d="M405.735 98.119c-16.07 87.751-139.326 185.399-238.499 20.383-59.02-64.685-96.506 74.864-175.874-12.585C-92.71-111.016 115.797-44.739 189.916-54.373 279.98-66.08 385.722-131.674 405.735 98.119Z"
    />
    <Defs></Defs>
  </Svg>
)
