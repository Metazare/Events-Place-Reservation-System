import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useSearch from "src/Hooks/useSearch";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import useModal from "src/Hooks/useModal";
import HelpDeskModal from "src/Components/HelpDeskModal";
import useHelpdesk from "src/Hooks/useHelpdesk";
import moment from "moment";

export default function HelpDesk() {
    const { ModalComponent, setOpenModal, closeModal } = useModal();
    const { SearchComponent } = useSearch([]);
    const { data, loading, error, getHelpdesk } = useHelpdesk();

    useEffect(() => {
        getHelpdesk({});
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div className="flex justify-start items-center gap-4">
                <SearchComponent />
                <IconButton aria-label="" onClick={() => {}}>
                    <FilterAltIcon />
                </IconButton>
            </div>
            <TableContainer>
                <Table
                    sx={{ minWidth: 650, maxWidth: 1500 }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Usename</TableCell>
                            <TableCell align="left">Subject</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    background: "#D7D7D7",
                                    cursor: "pointer",
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.helpdeskid}
                                </TableCell>
                                <TableCell align="left">
                                    <div className="flex gap-2 items-center">
                                        <Avatar
                                            variant="circular"
                                            src={row.user.photo}
                                            alt={row.user.name.first}
                                            sx={{
                                                width: "30px",
                                                height: "30px",
                                            }}
                                        />
                                        <p>
                                            {row.user.name.first}{" "}
                                            {row.user.name.last}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell align="left">
                                    {row.subject}
                                </TableCell>
                                <TableCell align="left">
                                    {moment(row.createdAt).format(
                                        "MMMM DD YYYY, h:mm:ss a"
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setOpenModal(
                                                    <HelpDeskModal
                                                        closeModal={closeModal}
                                                        toRespond={false}
                                                        data={row}
                                                    />
                                                );
                                            }}
                                            sx={{
                                                background: "white",
                                                color: "gray",
                                                ":hover": {
                                                    background: "white",
                                                },
                                            }}
                                        >
                                            View Report
                                        </Button>

                                        {row.response === undefined && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    setOpenModal(
                                                        <HelpDeskModal
                                                            closeModal={
                                                                closeModal
                                                            }
                                                            toRespond={true}
                                                            data={row}
                                                        />
                                                    );
                                                }}
                                            >
                                                Respond
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {ModalComponent()}
        </>
    );
}
