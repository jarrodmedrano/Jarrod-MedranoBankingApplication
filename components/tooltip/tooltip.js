const ToolTip = () => {
  const [bubblePosition, setBubblePosition] = React.useState(null);
  const [toolTipStyle, setToolTipStyle] = React.useState(null);
  const toolTipRef = React.useRef(null);
  const [showToolTip, setShowToolTip] = React.useState(false);

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
      top: toolTipTarget.bottom + offsetTwice,
      left:
        toolTipTarget.left -
        (bubblePosition ? bubblePosition.width / 2 : 0) +
        offset,
    };
  };

  useEffect(() => {
    if (showToolTip) {
      setToolTipStyle(stylePos());
    }
  }, [bubblePosition, showToolTip]);

  if (!showToolTip) {
    return null;
  }

  const toolTipClass = classNames(styles.toolTip, styles[toolTipPlacement]);

  if (!toolTipItems) {
    return <></>;
  }

  return React.createPortal(
    <div
      ref={toolTipRef}
      role="tooltip"
      className={toolTipClass}
      style={toolTipStyle}
      onClick={() => setShowToolTip(!showToolTip)}
    >
      {toolTipItems}
    </div>,
    document.getElementById("tooltip")
  );
};
