import React, { useState } from 'react';

// Hooks
import useHelpdesk from '../Hooks/useHelpdesk';

export default function TestHelpdesk() {
  const { data, loading, error, getHelpdesk, createReport, createResponse } = useHelpdesk();

  const [id, setId] = useState();
  const [userId, setUserId] = useState();
  const [report, setReport] = useState();
  const [response, setResponse] = useState();

  const getHelpdeskReport = (e: any) => {
    e.preventDefault();
    getHelpdesk({
      id: id,
      userId: userId
    });
  }

  const createHelpdeskResponse = (e: any) => {
    e.preventDefault();
    createResponse({
      id: id,
      response: response
    });
  }

  const createHelpdeskReport = (e: any) => {
    e.preventDefault();
    createReport({
      report: report
    });
  }

  return (
    <div>
      <h1>Create Report</h1>
      <form onSubmit={createHelpdeskReport}>
        <input type='text' placeholder='report' onChange={(e: any) => setReport(e.target.value)}/>
        <button type='submit'>Create Report</button>
      </form>
      <hr/>
      <h1>Respond to Report</h1>
      <form onSubmit={createHelpdeskResponse}>
        <input type='text' placeholder='id' onChange={(e: any) => setId(e.target.value)}/>
        <input type='text' placeholder='response' onChange={(e: any) => setResponse(e.target.value)}/>
        <button type='submit'>Create Respond</button>
      </form>
      <hr/>
      <h1>View Helpdesk Reports</h1>
      <form onSubmit={getHelpdeskReport}>
        <input type='text' placeholder='id' onChange={(e: any) => setId(e.target.value)}/>
        <input type='text' placeholder='user id' onChange={(e: any) => setUserId(e.target.value)}/>
        <input type='text' placeholder='report' onChange={(e: any) => setReport(e.target.value)}/>
        <input type='text' placeholder='response' onChange={(e: any) => setResponse(e.target.value)}/>
        <button type='submit'>View Reports</button>
      </form>
      {data?.map((helpdesk: any) => {
        return (
          <div>
            <hr/>
            <p>{helpdesk.id}</p>
            <p>{helpdesk.userId}</p>
            <p>{helpdesk.report}</p>
            <p>{helpdesk.response}</p>
            <hr/>
          </div>
        )
      })}
    </div>
  );
}
