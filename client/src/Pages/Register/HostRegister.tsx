import React from "react";
import Container from "@mui/material/Container";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextArea from "src/Components/TextArea";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import GoBackComp from "src/Components/GoBackComp";
import useFirebase from "src/Hooks/useFirebase";
import { useRegister } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import ImageBuilding from "../../Images/Building.svg";
import QuoteImg from "../../Images/Quote.png";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const steps = ["Get Started", "Details", "Confirmation"];

export default function HostRegister() {
    const { uploadFile } = useFirebase();
    const { registerHost } = useRegister();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const HostRegisterFormik = useFormik({
        initialValues: {
            description: "",
            images: "",
            isAgree: false,
        },
        validate: (values) => {
            const errors: {
                description?: string;
                images?: any;
                isAgree?: any;
            } = {};
            if (activeStep === 1) {
                if (!values.description)
                    errors.description = "Description is required";
                if (!values.images) errors.images = "Image is required";
            }

            if (activeStep === 2) {
                if (!values.isAgree)
                    errors.isAgree =
                        "Please agree to the policy and terms & condition";
            }
            return errors;
        },
        onSubmit: (values) => {
            if (activeStep === 2) {
                registerHost({
                    description: values.description,
                    license: values.images,
                });
                localStorage.setItem("mode", "Host");
                localStorage.setItem("New Host", "true");
                navigate("/");
            } else {
                setActiveStep(() => activeStep + 1);
            }
        },
    });
    return (
        <Container maxWidth="lg" className="grow ">
            <div className="h-full  py-4">
                <div className="flex justify-start">
                    <GoBackComp />
                </div>
                <div className="mt-[.5em] mb-[4em]">
                    <h5 className="text-[25px] font-semibold text-primary">
                        Register as an Owner
                    </h5>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Owner
                        </Link>
                        <Typography className="text-primary">
                            Register as an Owner
                        </Typography>
                    </Breadcrumbs>
                </div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <div className="mt-20">
                    {activeStep === 0 && (
                        <div className="flex flex-col gap-4 items-center">
                            <h6 className="text-center md:translate-x-[30px] text-[34px] font-semibold leading-[40px]">
                                Let&apos;s{" "}
                                <span className="text-[#0071BC]  font-bold">
                                    Transform
                                </span>{" "}
                                your event <br className="hidden md:block" />
                                <span className="text-[#0071BC]  font-bold">
                                    hosting dreams
                                </span>{" "}
                                into reality effortlessly{" "}
                                <br className="hidden md:block" />
                                with{" "}
                                <span className="text-[#0071BC]  font-bold">
                                    Events Place.
                                </span>
                            </h6>
                            <img
                                src={ImageBuilding}
                                alt="Qoute"
                                className=" mt-[5em] w-full max-w-[700px]"
                            />
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div
                            className="flex  flex-col w-full gap-3 md:grid mt-10"
                            style={{ gridTemplateColumns: "1fr .6fr" }}
                        >
                            <div>
                                <TextArea
                                    value={
                                        HostRegisterFormik.values.description
                                    }
                                    name="description"
                                    label="Owner Description"
                                    handleChange={
                                        HostRegisterFormik.handleChange
                                    }
                                    cols={90} // specify the number of columns
                                    rows={15} // specify the number of rows
                                    error={
                                        HostRegisterFormik.touched
                                            .description &&
                                        HostRegisterFormik.errors
                                            .description !== undefined
                                    }
                                    errorMessages={
                                        HostRegisterFormik.errors.description
                                    }
                                />
                            </div>
                            <div className=" grow">
                                <h6
                                    className={`mb-2  font-[500] ${
                                        HostRegisterFormik.touched.images &&
                                        HostRegisterFormik.errors.images &&
                                        "text-[red]"
                                    }`}
                                >
                                    Upload License
                                </h6>
                                <div className="flex">
                                    <input
                                        type="file"
                                        name="images"
                                        id="file"
                                        className="hidden"
                                        multiple
                                        onChange={async (e) => {
                                            if (e.target.files) {
                                                const fileUrl =
                                                    await uploadFile(
                                                        e.target.files[0],
                                                        "events_place_marikina"
                                                    );
                                                HostRegisterFormik.setFieldValue(
                                                    "images",
                                                    fileUrl
                                                );
                                            }
                                        }}
                                        accept=".jpg, .png"
                                    />
                                    <label
                                        htmlFor="file"
                                        className={`bg-[#EEEEEE] border border-dashed  text-white rounded-xl cursor-pointer flex flex-col py-[2em] px-[6em] justify-center items-center ${
                                            HostRegisterFormik.touched.images &&
                                            HostRegisterFormik.errors.images
                                                ? "border-[red]"
                                                : "border-primary"
                                        }`}
                                    >
                                        {HostRegisterFormik.values.images
                                            ? "Change Image"
                                            : "Upload Image"}
                                    </label>
                                </div>
                                {HostRegisterFormik.touched.images &&
                                    HostRegisterFormik.errors.images && (
                                        <p className="text-[red] text-[13px] mt-1">
                                            {HostRegisterFormik.errors.images}
                                        </p>
                                    )}
                                {HostRegisterFormik.values.images && (
                                    <img
                                        className="mt-4 rounded-xl w-full"
                                        src={HostRegisterFormik.values.images}
                                        alt=""
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {activeStep === 2 && (
                        <div>
                            <div className="relative flex  px-[4em] justify-center mt-[9em]">
                                <img
                                    src={QuoteImg}
                                    className="absolute bottom-[20%] left-0 z-[-1]"
                                    alt=""
                                />
                                <p className="text-center text-[28px] text-[black]/50 z-1">
                                    “Join our community of owners and unlock the{" "}
                                    <br className="hidden md:block" />
                                    potential of your event spaces!”
                                </p>
                                <img
                                    src={QuoteImg}
                                    alt="Qoute"
                                    className="absolute bottom-[20%] right-0 z-[-1]"
                                    style={{ transform: "scaleX(-1)" }}
                                />
                            </div>
                            <div className="flex gap-2 items-center mt-[3em] ">
                                <Checkbox
                                    checked={HostRegisterFormik.values.isAgree}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<TaskAltIcon />}
                                    onClick={() => {
                                        HostRegisterFormik.setFieldValue(
                                            "isAgree",
                                            !HostRegisterFormik.values.isAgree
                                        );
                                    }}
                                />
                                <p>
                                    I agree with the{" "}
                                    <a
                                        className="font-bold cursor-pointer"
                                        target="_blank"
                                        href="/privacy"
                                    >
                                        Policy
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        className="font-bold cursor-pointer"
                                        target="_blank"
                                        href="/termsncondition"
                                    >
                                        Terms & Condition
                                    </a>
                                </p>
                            </div>
                            {HostRegisterFormik.touched.isAgree &&
                            HostRegisterFormik.errors.isAgree ? (
                                <p className="text-[red] text-[13px] mt-1">
                                    {HostRegisterFormik.errors.isAgree}
                                </p>
                            ) : null}
                        </div>
                    )}
                </div>

                <div className="flex justify-center gap-4 mt-[7em] mb-[2em] ">
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => {
                            if (activeStep === 0) {
                                navigate("/");
                            } else {
                                setActiveStep(() => activeStep - 1);
                            }
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => {
                            HostRegisterFormik.handleSubmit();
                        }}
                    >
                        {activeStep === 2 ? "Submit" : "Next"}
                    </Button>
                </div>
            </div>
        </Container>
    );
}
