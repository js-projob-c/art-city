// import { ErrorMessage } from "@hookform/error-message";
// import {
//   Box,
//   Button,
//   Input,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   Text,
// } from "@mantine/core";
// import { isFunction, isNil } from "lodash";
// import React, { useCallback, useEffect } from "react";
// import { Controller, UseFormReturn } from "react-hook-form";

// import { FormConfigProps } from "@/common/constants/types";

// import styles from "./FormItems.module.scss";
// import PhoneInput from "./PhoneInput";

// interface IProps {
//   formConfig: any;
//   serverErrMsg: string;
//   submitText?: string;
//   useFormObj: UseFormReturn;
//   onSubmit?: any;
//   hideSubmitButton?: boolean;
//   children?: React.ReactNode;
//   serverOptions?: ServerOptionsProps;
//   customComponents?: CustomComponentProps;
// }

// interface ServerOptionsProps {
//   [x: string]: { options: { label: string; value: any }[] };
// }

// interface CustomComponentProps {
//   [x: string]:
//     | ((value: any, object: Record<string, any>) => React.ReactNode | any)
//     | React.ReactNode
//     | any;
// }

// const FormGroup = ({
//   useFormObj,
//   onSubmit,
//   formConfig,
//   serverErrMsg,
//   submitText,
//   children,
//   serverOptions = {},
//   customComponents = {},
//   hideSubmitButton = false,
// }: IProps) => {
//   const {
//     control,
//     watch,
//     formState: { errors },
//     // getValues,
//     handleSubmit,
//     setValue,
//   } = useFormObj;

//   useEffect(() => {
//     console.log("errors", errors);
//   }, [errors]);

//   const submit = useCallback(
//     (data: any) => {
//       onSubmit(data);
//     },
//     [onSubmit]
//   );

//   const renderFormItem = (obj: FormConfigProps) => {
//     const transformValue = (value: any) => {
//       return obj.transform ? obj.transform(value) : value;
//     };

//     switch (obj.component) {
//       case "input":
//         return (
//           <Controller
//             render={({
//               field: { onChange, onBlur, value },
//               fieldState: { error },
//             }) => (
//               <Input
//                 fullWidth
//                 disabled={obj.disabled}
//                 placeholder={obj.placeholder}
//                 type={obj.type}
//                 onChange={(e) =>
//                   onChange(
//                     transformValue(
//                       obj.type === "number"
//                         ? parseFloat(e.target.value)
//                         : e.target.value
//                     )
//                   )
//                 }
//                 onBlur={onBlur}
//                 value={transformValue(value)}
//                 inputProps={{ ...obj.props }}
//               />
//             )}
//             name={obj.name || ""}
//             control={control}
//             defaultValue={!isNil(obj.defaultValue) ? obj.defaultValue : ""}
//             rules={obj.config}
//           />
//         );
//       case "input_phone":
//         return (
//           <Controller
//             render={({ field: { onChange, onBlur, value } }) => (
//               <PhoneInput
//                 value={transformValue(value)}
//                 onChangeValue={(text) => onChange(transformValue(text))}
//                 onBlur={onBlur}
//                 placeholder={obj.placeholder}
//                 disabled={obj.disabled}
//               />
//             )}
//             name={obj.name || ""}
//             control={control}
//             defaultValue={!isNil(obj.defaultValue) ? obj.defaultValue : ""}
//             rules={obj.config}
//           />
//         );
//       case "text_area":
//         return (
//           <Controller
//             render={({ field: { onChange, onBlur, value } }) => (
//               <Input
//                 fullWidth
//                 multiline
//                 disabled={obj.disabled}
//                 // hidden={obj.hidden}
//                 placeholder={obj.placeholder}
//                 type={obj.type}
//                 onChange={(e) => onChange(e.target.value)}
//                 onBlur={onBlur}
//                 value={transformValue(value)}
//               />
//             )}
//             name={obj.name || ""}
//             control={control}
//             defaultValue={!isNil(obj.defaultValue) ? obj.defaultValue : ""}
//             rules={obj.config}
//           />
//         );
//       case "select":
//         return (
//           <Controller
//             render={({ field: { onChange, value, onBlur } }) => (
//               <Select
//                 disabled={obj.disabled}
//                 value={transformValue(value)}
//                 onChange={(e) => onChange(transformValue(e?.target?.value))}
//                 onBlur={onBlur}
//                 placeholder={obj.placeholder}
//               >
//                 {(serverOptions?.[obj.name || ""]?.options || obj.options)?.map(
//                   (item: any, i: number) => (
//                     <MenuItem key={item.value + i} value={item.value}>
//                       {item.label}
//                     </MenuItem>
//                   )
//                 )}
//               </Select>
//             )}
//             name={obj.name || ""}
//             control={control}
//             defaultValue={!isNil(obj.defaultValue) ? obj.defaultValue : ""}
//             rules={obj.config}
//           />
//         );
//       case "select_multiple":
//         return (
//           <Controller
//             render={({ field: { onChange, value, onBlur } }) => (
//               <Select
//                 multiple
//                 disabled={obj.disabled}
//                 value={transformValue(value)}
//                 onChange={(value) => onChange(transformValue(value))}
//                 onBlur={onBlur}
//                 placeholder={obj.placeholder}
//               >
//                 {(serverOptions?.[obj.name || ""]?.options || obj.options)?.map(
//                   (item: any, i: number) => (
//                     <MenuItem key={item.value + i} value={item.value}>
//                       {item.label}
//                     </MenuItem>
//                   )
//                 )}
//               </Select>
//             )}
//             name={obj.name || ""}
//             control={control}
//             defaultValue={!isNil(obj.defaultValue) ? obj.defaultValue : []}
//             rules={obj.config}
//           />
//         );
//       case "checkbox":
//         return (
//           <Controller
//             render={({ field: { onChange, value, onBlur } }) => (
//               <Select
//                 fullWidth
//                 disabled={obj.disabled}
//                 value={transformValue(value)}
//                 onChange={onChange}
//                 onBlur={onBlur}
//                 placeholder={obj.placeholder}
//               >
//                 {(serverOptions?.[obj.name || ""]?.options || obj.options)?.map(
//                   (item: any, i: number) => (
//                     <MenuItem key={item.value + i} value={item.value}>
//                       {item.label}
//                     </MenuItem>
//                   )
//                 )}
//               </Select>
//             )}
//             name={obj.name || ""}
//             control={control}
//             defaultValue={!isNil(obj.defaultValue) ? obj.defaultValue : ""}
//             rules={obj.config}
//           />
//         );
//       // case 'datetime-local':
//       //   return (
//       //     <Controller
//       //       render={({field: {onChange, onBlur, value, ref}}) => (
//       //         // <Select
//       //         // 	inputRef={ref}
//       //         // 	disabled={obj.disabled}
//       //         // 	hidden={obj.hidden}
//       //         // 	fullWidth
//       //         // 	value={value}
//       //         // 	onBlur={onBlur}
//       //         // 	onChange={onChange}
//       //         // 	placeholder={t(obj.placeholder)}>
//       //         // 	{obj.options.map((item: any) => (
//       //         // 		<MenuItem
//       //         // 			key={item.label}
//       //         // 			value={item.value}>
//       //         // 			{t(item.label)}
//       //         // 		</MenuItem>
//       //         // 	))}
//       //         // </Select>
//       //         <TextField
//       //           inputRef={ref}
//       //           // label={obj.label}
//       //           type="datetime-local"
//       //           //   sx={{ width: 250 }}
//       //           InputLabelProps={{
//       //             shrink: true,
//       //           }}
//       //           value={value}
//       //           onChange={onChange}
//       //         />
//       //       )}
//       //       name={obj.name}
//       //       control={control}
//       //       defaultValue={obj.defaultValue || new Date()}
//       //       rules={obj.config}
//       //     />
//       //   );
//       case "link":
//         return (
//           <Controller
//             render={({
//               field: { onChange, onBlur, value },
//               fieldState: { error },
//             }) => (
//               <Link to={obj.link ? obj.link(value) : ""} target="_blank">
//                 {transformValue(value)}
//               </Link>
//             )}
//             name={obj.name || ""}
//             control={control}
//             defaultValue={!isNil(obj.defaultValue) ? obj.defaultValue : ""}
//             rules={obj.config}
//           />
//         );
//       case "custom":
//         return (
//           <>
//             {customComponents?.[obj?.customKey || obj?.name || ""] ? (
//               <Controller
//                 key={obj?.customKey || obj?.name}
//                 render={({
//                   field: { onChange, onBlur, value },
//                   fieldState: { error },
//                 }) => {
//                   const toRender =
//                     customComponents?.[obj?.customKey || obj?.name || ""];
//                   return isFunction(toRender) ? toRender(value, obj) : toRender;
//                 }}
//                 name={obj.name || ""}
//                 control={control}
//                 defaultValue={!isNil(obj.defaultValue) ? obj.defaultValue : ""}
//                 rules={obj.config}
//               />
//             ) : null}
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Stack gap={"sm"}>
//       {formConfig?.map((obj: FormConfigProps, index: number) => {
//         if (obj?.displayIfMatch && !obj?.displayIfMatch(watch)) {
//           return null;
//         }

//         return (
//           <Box
//             key={obj.name || obj.customKey || index}
//             // HIDE ID FIELD ON CREATE MODE --- WHEN THERE IS VALUE FOR FIELD "id"
//             // sx={
//             //   obj?.['name'] === 'id' && !watch()?.id ? {display: 'none'} : {}
//             // }
//           >
//             <InputLabel
//               required={
//                 (obj.config?.required as Record<string, any>)?.value === true
//               }
//             >
//               {obj.label}
//             </InputLabel>
//             <FormHelperText>{obj.description}</FormHelperText>
//             <FormControl
//               className={styles.formItemRow}
//               error={Boolean(errors[obj.name || ""])}
//               required={
//                 (obj.config?.required as Record<string, any>)?.value === true
//               }
//             >
//               {renderFormItem(obj)}
//               <ErrorMessage
//                 errors={errors}
//                 name={obj.name || ""}
//                 render={({ message }: any) => {
//                   return (
//                     <FormHelperText error={true}>{message}</FormHelperText>
//                   );
//                 }}
//               />
//             </FormControl>
//           </Box>
//         );
//       })}
//       {children}
//       {!hideSubmitButton && (
//         <Button
//           // className={styles.submitButton}
//           // disabled={thunkLoadingStatus === fetchStatus.LOADING}
//           // loading={thunkLoadingStatus === fetchStatus.LOADING}
//           // type="submit"
//           disabled={!formConfig || !onSubmit}
//           onClick={handleSubmit(submit)}
//           variant="contained"
//         >
//           {submitText || "Submit"}
//         </Button>
//       )}
//       <Text>{serverErrMsg}</Text>
//     </Stack>
//   );
// };

// export default FormGroup;

// // const styles = StyleSheet.create({
// //   multipleSelect: {
// //     maxWidth: SIZES.width * 0.9,
// //   },
// // });
