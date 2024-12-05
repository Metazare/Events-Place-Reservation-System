import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SelectField from "./SelectField";
import Button from "@mui/material/Button";
import useCMS from "src/Hooks/useCMS";
import useFirebase from "src/Hooks/useFirebase";

export default function CMSModal({ closeModal }) {
    const { data, loading, error, updateCms } = useCMS();
    const { uploadFile } = useFirebase();
    const [color, setColor] = useState("#fff");

    const handleChangeComplete = (color) => {
        setColor(color.hex); // color.hex will give you the selected color in hex format
    };
    const formik = useFormik({
        initialValues: {
            image: "",
            color: "#144273",
        },
        onSubmit: async (values) => {
            const fileUrl = await uploadFile(values.image);
            updateCms({
                color: values.color,
                logo: fileUrl,
            });
            closeModal();
        },
    });
    return (
        <>
            <Box
                sx={{
                    padding: "20px",
                }}
            >
                <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                        marginBottom: "10px",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    Content Management System
                </Typography>
                <Typography variant="body1" color="initial" mb={1}>
                    Logo
                </Typography>
                <TextField
                    id="image"
                    value={formik.values.image}
                    onChange={(e) => {
                        formik.setFieldValue("image", e.target.value);
                    }}
                    fullWidth
                    type="file"
                    sx={{
                        marginBottom: "10px",
                    }}
                />
                <Box display="flex" gap={"1em"}>
                    <SelectField
                        label="Color"
                        name="color"
                        value={formik.values.color}
                        handleChange={(e) => {
                            formik.setFieldValue("color", e.target.value);
                        }}
                        options={[
                            { value: "#144273", label: "Default Blue" },
                            { value: "#87CEEB", label: "Sky Blue" },
                            { value: "#1E90FF", label: "Dodger Blue" },
                            { value: "#4169E1", label: "Royal Blue" },
                            { value: "#0000CD", label: "Medium Blue" },
                            { value: "#4682B4", label: "Steel Blue" },
                        ]}
                    />
                    <Box
                        sx={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "10%",
                            backgroundColor: formik.values.color,
                            mt: "34px",
                            flexShrink: 0,
                        }}
                    />
                </Box>

                <Box
                    display="grid"
                    sx={{
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        mt: "1em",
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={formik.handleSubmit}
                        type="submit"
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    );
}
