export function isJsonString(string) {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
}
// export const validationForm = (object) => {
//   let array = Object.entries(object);
//   array.map(([objectKey, objectValue]) => {
//     /* Если id или uuid, игнор */
//     if (objectKey === "id" || objectKey === "uuid") {
//       return [objectKey, objectValue];
//     }
//     /* Если specification, игнор */
//     if (objectKey.indexOf("specification") !== -1) {
//       return [objectKey, objectValue];
//     }
//     objectValue.isValid = objectValue.value.length > 0;
//     return [objectKey, objectValue];
//   });
//   return Object.fromEntries(array);
// };

// export const createForm = (object) => {
//   let array = Object.entries(object);
//   let newArray = array.map(([objectKey, objectValue]) => {
//     if (objectKey === "id" || objectKey === "uuid")
//       return [objectKey, objectValue];
//     objectValue = {
//       name: objectKey,
//       label: labelForm(objectKey),
//       value: objectValue,
//       value2: objectValue,
//       isValid: false,
//     };
//     return [objectKey, objectValue];
//   });
//   return Object.fromEntries(newArray);
// };

// const labelForm = (string) => {
//   if (string === "name") return "название";
//   if (string.indexOf("specification") !== -1) return "характеристика";
//   if (string === "title") return "загаловок";
//   if (string === "description") return "описание";
//   if (string === "email") return "email";
//   if (string === "password") return "пароль";
//   return string;
// };
