let pincodeData = new Object();
let map = new Map();

const getPinCodeData = async () => {
  await fetch("./pincodes.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      getPinCode(new Object(data));
    })
    .catch((err) => {
      console.log(err);
    });
};
getPinCodeData();

const getPinCode = (pincodeData) => {
  Object.entries(pincodeData).forEach((item) => {
    if (!map.has(item[1].pincode)) {
      map.set(item[1].pincode, { data: item[1] });
    }
  });
  convertToJSON(map);
};

const convertToJSON = (map) => {
  let obj = new Object();
  for (let [key, value] of map) {
    obj[key] = value;
  }
  document.querySelector("button").addEventListener("click", () => {
    saveFile(obj);
  });
};

async function saveFile() {
  try {
    // create a new handle
    const newHandle = await window.showSaveFilePicker();

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // write our file
    await writableStream.write(obj);

    // close the file and write the contents to disk.
    await writableStream.close();
  } catch (err) {
    console.error(err.name, err.message);
  }
}
