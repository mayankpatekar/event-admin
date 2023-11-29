import React, { useEffect, useState } from "react"
import './ViewData.css';


const ViewData = () => {

    const [count, setCount] = useState({count: 0,
        rejected: 0,
        accepted: 0,
        Entered: 0,});
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        accepted: false,
        rejected: false,
        Entered: false,
    });

    

    useEffect(() => {
        // Construct the query parameters based on the filter object
        const queryParams = Object.keys(filter)
            .filter((key) => filter[key])
            .map((key) => `${key}=true`)
            .join('&');

        // Fetch data from your API endpoint based on the filter options
        fetch(`https://adminbackend-huuq.onrender.com/api/data?${queryParams}`)
            .then((response) => response.json())
            .then((data) => setData(data));
        
            fetch(`https://adminbackend-huuq.onrender.com/api/count`)
            .then((response) => response.json())
            .then((data) => {
              setCount(data);
              console.log(count); // Log the response data after setting it to the state
            });
        
    }, [filter]);



    return (
        <>
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <i className="fas fa-chart-line"></i>
                            <h2>Total Form Submited</h2>
                            <p>{count.count}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <i className="fas fa-dollar-sign"></i>
                            <h2>Total Form Accepted</h2>
                            <p>{count.accepted}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <i className="fas fa-dollar-sign"></i>
                            <h2>Total Form Rejected</h2>
                            <p>{count.rejected}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <i className="fas fa-users"></i>
                            <h2>Total crowd in ground</h2>
                            <p>{count.Entered}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Data Page</h1>
                    <div>
                        Filter by:
                        <label>
                            Accepted
                            <input
                                type="checkbox"
                                checked={filter.accepted}
                                onChange={() => setFilter({ ...filter, accepted: !filter.accepted })}
                            />
                        </label>
                        <label>
                            Rejected
                            <input
                                type="checkbox"
                                checked={filter.rejected}
                                onChange={() => setFilter({ ...filter, rejected: !filter.rejected })}
                            />
                        </label>
                        <label>
                            Entered
                            <input
                                type="checkbox"
                                checked={filter.Entered}
                                onChange={() => setFilter({ ...filter, Entered: !filter.Entered })}
                            />
                        </label>
                        <p>Total Count after Filter: {data!==null?(data.length):0}</p>
                        {/* <ul>
        {filteredData.map((item) => (
          <li key={item._id}>{item.name} - {item.status}</li>
        ))}


      </ul> */}
{
    data && data.length > 0 ?<table>
    <thead>
        <tr>
            <th>Sr. no</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Email</th>
            <th>Receipt Number</th>
            <th>Accepted</th>
            <th>Rejected</th>
            <th>Entered</th>
            {/* <th>Receipt Image</th> */}
        </tr>
    </thead>
    <tbody>
        {data.map((form, index) => (
            <tr key={form._id}>
                <td>{index + 1}</td>
                <td>{form.name}</td>
                <td>{form.rollNo}</td>
                <td>{form.classN}</td>
                <td>{form.email}</td>
                <td>{form.receiptNo}</td>
                <td>{form.accepted?'True':'False'}</td>
                <td>{form.rejected?'True':'False'}</td>
                <td>{form.Entered? 'True':'False'}</td>
                </tr>
        ))}
    </tbody>
</table>:
    <>No data is there to display , wait for some time</>
}
                        
                    </div>
                    </div>
                </div>
            </>
            )
}

            export default ViewData;