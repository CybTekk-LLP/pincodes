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
      map.set(item[1].pincode, {
        pincode: item[1].pincode,
        district: item[1].districtName,
        state: item[1].stateName,
      });
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
    saveFile(JSON.stringify(Object.values(obj)));
  });
};

async function saveFile(json) {
  try {
    // create a new handle
    const newHandle = await window.showSaveFilePicker();

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // write our file
    await writableStream.write(json);

    // close the file and write the contents to disk.
    await writableStream.close();
  } catch (err) {
    console.error(err.name, err.message);
  }
}
