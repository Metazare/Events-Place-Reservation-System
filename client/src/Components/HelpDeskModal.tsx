import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import TextArea from "./TextArea";
import useHelpdesk from "src/Hooks/useHelpdesk";
import useNotif from "src/Hooks/useNotif";
interface PropsType {
    closeModal: () => void;
    toRespond: boolean;
    data: any;
}
export default function HelpDeskModal({
    closeModal,
    toRespond,
    data,
}: PropsType) {
    const [openToRespond, setOpenToRespond] =
        React.useState<boolean>(toRespond);
    const { createResponse } = useHelpdesk();
    const { sendNotification } = useNotif();
    const formik = useFormik({
        initialValues: {
            message: "",
        },
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.message) {
                errors.message = "Required";
            }
            return errors;
        },
        onSubmit: (values) => {
            createResponse({
                response: values.message,
                id: data.helpdeskid,
            });
            sendNotification({
                userId: data.user.userId,
                type: "You received a response to your report!",
                content: "Admin:" + values.message,
            });
            closeModal();
        },
    });
    return (
        <div className="p-4 w-[100vh] max-w-[500px] flex flex-col gap-4">
            <h6 className="text-[22px] font-semibold">View Report</h6>
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <Avatar
                        variant="circular"
                        src=""
                        alt="Sample"
                        sx={{ width: "35px", height: "35px" }}
                    />
                    <p>
                        {data.user.name.first} {data.user.name.last}
                    </p>
                </div>
                <a href="/" target="_blank">
                    <div
                        className="bg-[white] px-4 py-2 border rounded-xl border-[black]/10 hover:bg-[black]/20"
                        style={{ transition: "all .3s ease-in-out" }}
                    >
                        View Events Place
                    </div>
                </a>
            </div>
            <div className="py-4 border-y border-[black]/20 min-h-[300px]">
                {openToRespond ? (
                    <>
                        <TextArea
                            value={formik.values.message}
                            name="message"
                            label="Your Message"
                            handleChange={formik.handleChange}
                            cols={20} // specify the number of columns
                            rows={5} // specify the number of rows
                            error={
                                formik.touched.message &&
                                formik.errors.message !== undefined
                            }
                            errorMessages={formik.errors.message}
                        />
                    </>
                ) : (
                    <>
                        <h6 className="text-[18px] font-semibold">Subject:</h6>
                        <p className="text-[14px]">
                            {data?.subject || "Sample Title"}
                        </p>
                        <h6 className="text-[18px] font-semibold mt-4">
                            Concern:
                        </h6>
                        <p className="text-[14px]">
                            {data?.report || "Sample Report"}
                        </p>

                        {data?.response && (
                            <>
                                <h6 className="text-[18px] font-semibold mt-4">
                                    Response:
                                </h6>
                                <p className="text-[14px]">
                                    {data?.response || "Sample Report"}
                                </p>
                            </>
                        )}
                    </>
                )}
            </div>
            <div className="flex justify-center gap-4">
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        background: "white",
                        color: "black",
                        ":hover": { background: "white" },
                    }}
                    onClick={() => {
                        if (openToRespond) {
                            setOpenToRespond(false);
                        } else {
                            closeModal();
                        }
                    }}
                >
                    {openToRespond ? "Back" : "Cancel"}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (openToRespond) {
                            formik.handleSubmit();
                        } else {
                            setOpenToRespond(true);
                        }
                    }}
                >
                    Respond
                </Button>
            </div>
        </div>
    );
}
