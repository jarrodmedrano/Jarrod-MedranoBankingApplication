const ToolTip = (props) => {
  const { showToolTip, toolTipContent, toolTipTarget } = props;
  const [bubblePosition, setBubblePosition] = React.useState(null);
  const [toolTipStyle, setToolTipStyle] = React.useState(null);
  const toolTipRef = React.useRef(null);

  React.useEffect(() => {
    if (toolTipRef && toolTipRef.current) {
      let rect = toolTipRef.current.getBoundingClientRect();
      setBubblePosition(rect);
    }

    if (!showToolTip) {
      setToolTipStyle({
        opacity: "0",
      });
    }
  }, [showToolTip]);

  const stylePos = () => {
    const offset = 5;
    const offsetTwice = 10;
    return {
      top: toolTipTarget.top,
      left: toolTipTarget.left - toolTipTarget.width - 200,
    };
  };

  useEffect(() => {
    if (showToolTip && toolTipTarget) {
      setToolTipStyle(stylePos());
    }
  }, [bubblePosition, showToolTip, toolTipTarget]);

  if (!showToolTip) {
    return null;
  }

  if (!toolTipContent) {
    return <></>;
  }

  const styles = {
    toolTip: {
      backgroundColor: "black",
      color: "white",
      maxWidth: "200px",
      whiteSpace: "pre-wrap",
      listStyle: "none",
      fontSize: "12px",
      margin: "0",
      padding: "0.5rem",
      position: "fixed",
      zIndex: "99999",
      borderRadius: "3px",
      position: "absolute",
    },
  };

  const toolTipClass = `${styles.toolTip}`;

  return ReactDOM.createPortal(
    <div
      ref={toolTipRef}
      role="tooltip"
      className={toolTipClass}
      style={(toolTipStyle, styles.toolTip)}
      onClick={() => setShowToolTip(!showToolTip)}
    >
      {toolTipContent}
    </div>,
    document.getElementById("tooltip")
  );
};
