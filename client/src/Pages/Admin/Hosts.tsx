import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import useSearch from "src/Hooks/useSearch";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Avatar from "@mui/material/Avatar";
import useUser from "src/Hooks/useUser";

export default function Hosts() {
    const { SearchComponent } = useSearch([]);
    const { data, loading, error, getUser } = useUser();

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

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
                            <TableCell align="left">Username</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Contact Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.length > 0 ? (
                            data
                                .filter(
                                    (user: any) =>
                                        user.license &&
                                        user.name.first !== "Admin"
                                )
                                .map((user: any) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            background: "#D7D7D7",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {user.userId}
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="flex gap-2 items-center">
                                                <Avatar
                                                    variant="circular"
                                                    src={user.photo}
                                                    alt={user.username}
                                                    sx={{
                                                        width: "30px",
                                                        height: "30px",
                                                    }}
                                                />
                                                <p>
                                                    {user.name.first}{" "}
                                                    {user.name.suffix}{" "}
                                                    {user.name.middle}{" "}
                                                    {user.name.last}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            {user.email}
                                        </TableCell>
                                        <TableCell align="left">
                                            {user.contact}
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
