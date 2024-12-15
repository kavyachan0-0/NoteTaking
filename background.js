chrome.browserAction.onClicked.addListener(() => {
    chrome.windows.create({
      url: "index.html", // Your main file
      type: "popup",
      width: 5000,
      height: 1000
    });
  });
  