/**
 * Created by Jimmy Lan
 * Creation Date: 2020-10-31
 */
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const animatedSpanDimension = 3;
const animatedSpanColor = "#7e57c2";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      overflow: "hidden",
      padding: animatedSpanDimension,
      "& span": {
        opacity: 0,
        transition: "0.5s",
      },
    },
    rootHovered: {
      opacity: 1,
      "& span": {
        opacity: 1,
      },
    },
    card: {
      borderRadius: 0,
    },
    fade: {
      opacity: 0.2,
    },
    image: {},
    cardContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      marginBottom: 0,
    },
    // Span styles
    topSpan: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: animatedSpanDimension,
      background: `linear-gradient(to right, transparent, ${animatedSpanColor})`,
      animation: "$animateSpan1 2s linear infinite",
    },
    rightSpan: {
      position: "absolute",
      top: 0,
      right: 0,
      width: animatedSpanDimension,
      height: "100%",
      background: `linear-gradient(to bottom, transparent, ${animatedSpanColor})`,
      animation: "$animateSpan2 2s linear infinite",
      animationDelay: "1s",
    },
    bottomSpan: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: "100%",
      height: animatedSpanDimension,
      background: `linear-gradient(to left, transparent, ${animatedSpanColor})`,
      animation: "$animateSpan3 2s linear infinite",
    },
    leftSpan: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: animatedSpanDimension,
      height: "100%",
      background: `linear-gradient(to top, transparent, ${animatedSpanColor})`,
      animation: "$animateSpan4 2s linear infinite",
      animationDelay: "1s",
    },
    // Span animations
    "@keyframes animateSpan1": {
      "0%": {
        transform: "translateX(-100%)",
      },
      "100%": {
        transform: "translateX(100%)",
      },
    },
    "@keyframes animateSpan2": {
      "0%": {
        transform: "translateY(-100%)",
      },
      "100%": {
        transform: "translateY(100%)",
      },
    },
    "@keyframes animateSpan3": {
      "0%": {
        transform: "translateX(100%)",
      },
      "100%": {
        transform: "translateX(-100%)",
      },
    },
    "@keyframes animateSpan4": {
      "0%": {
        transform: "translateY(100%)",
      },
      "100%": {
        transform: "translateY(-100%)",
      },
    },
  })
);
