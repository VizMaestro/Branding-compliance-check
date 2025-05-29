figma.showUI(__html__, { width: 600, height: 350 });

figma.ui.onmessage = async (msg) => {
  const checks = msg.checks;
  const nodesWithIssues = [];
  const issueCounts = {};
  const styleCache = new Map();

  const isFromLibrary = (node) => {
    return node.remote === true || node.importedComponent !== undefined;
  };

  const getStyle = (id) => {
    if (!id) return null;
    if (styleCache.has(id)) return styleCache.get(id);
    const style = figma.getStyleById(id);
    styleCache.set(id, style);
    return style;
  };

  const addIssue = (type, node) => {
    if (!isFromLibrary(node)) {
      nodesWithIssues.push(node);
      issueCounts[type] = (issueCounts[type] || 0) + 1;
    }
  };

  const checkNode = (node) => {
    if (checks.includes("colors") && Array.isArray(node.fills) && node.fills.length > 0) {
      const style = getStyle(node.fillStyleId);
      if (!style || !style.remote) addIssue("Colors", node);
    }

    if (checks.includes("fonts") && node.type === "TEXT") {
      const style = getStyle(node.textStyleId);
      if (!style || !style.remote) addIssue("Fonts", node);
    }

    if (checks.includes("frames") && node.type === "FRAME" && !node.componentPropertyReferences) {
      addIssue("Frames", node);
    }

    if (checks.includes("effects") && node.effects && node.effects.length > 0) {
      const style = getStyle(node.effectStyleId);
      if (!style || !style.remote) addIssue("Effects", node);
    }
  };

  const traverse = (node) => {
    checkNode(node);
    if ("children" in node) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  };

  // ✅ Only check the current page
  traverse(figma.currentPage);

  if (msg.type === "highlight" || msg.type === "mark") {
    if (msg.type === "mark") {
      for (const node of nodesWithIssues) {
        if ("strokes" in node) {
          node.strokes = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];
          node.strokeWeight = 2;
        }
      }
    }
    figma.currentPage.selection = nodesWithIssues;
    if (nodesWithIssues.length > 0) {
      figma.viewport.scrollAndZoomIntoView(nodesWithIssues);
    }
  }

  figma.ui.postMessage({ count: nodesWithIssues.length, issueCounts });
};