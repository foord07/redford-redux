import React from 'react'
import {Loader} from '../components';
import {useSelector} from 'react-redux';
import * as actions from '../actions';

const TableListing = (tableDataProp) => {
    const isLoading = useSelector(state => state.loadingStore);
    const generateTD = (item) =>{
        const tdItems = [];
        for(const property in item) {
            tdItems.push(item[property]);
        }
        return tdItems;
    }
    const generateTableBody = (tableDataProp) => {
        // tableDataProp = tableDataProp.slice(0,100);
        return tableDataProp.map((item,i)=>{
            const tdItems = generateTD(item);
            return <tr  key={i}>{
                    tdItems.map((textItem,i)=>{
                        if(i===0){
                            let link = "https://www.google.com/search?q=" + textItem;
                            return <td key={i}><a href={link} target="_blank" rel="noreferrer"> {textItem}</a></td>
                        }else{
                            return <td key={i}>{textItem}</td>
                        }
                    })}</tr>
        })
    }
    const generateTableHeaders = (tableDataProp) => {
        tableDataProp = tableDataProp.slice(0,1);
        const thItems = [];
        return tableDataProp.map((item,i)=>{
            for(const property in item) {thItems.push(property);}
            return thItems.map((textItem,i)=>{
                return <th key={i}>{textItem}</th>
            })
        });
    }
    let displayTblHeader ,displayTblBody,serviceUnavailable,isDataEmpty=false;
    let count = 0;
    if(typeof tableDataProp.tableDataProp !== "undefined"){
        if(tableDataProp.tableDataProp.status !== 404 && tableDataProp.tableDataProp.status !== "" ){
            isDataEmpty = tableDataProp.tableDataProp.length ===0;
            count = isDataEmpty ? 0 : tableDataProp.tableDataProp.length;
            displayTblHeader = generateTableHeaders(tableDataProp.tableDataProp);
            displayTblBody = generateTableBody(tableDataProp.tableDataProp);
        }else{
            serviceUnavailable=true;
        }
    }
    return (
        <div className="tbl-box">
        {
            serviceUnavailable ?
                <h1 data-testid="errorData" className="error">Sorry! <br/>{tableDataProp.tableDataProp.statusText}. <br/>Please try again later.</h1>
            :
            <React.Fragment>
                {isLoading ? <Loader/> :
                    <React.Fragment>
                    {
                        isDataEmpty ?
                        <p>No matching records found.</p>
                        :
                        <React.Fragment>
                            <table className="tbl-list" data-testid="tblListData">
                            <caption>{count} List of all of the nouns in vedic literature, including the flora, fauna, geography, food, relationships, and objects</caption>
                                <thead>
                                    <tr>
                                        {displayTblHeader}
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayTblBody}
                                </tbody>
                              </table>
                          </React.Fragment>
                      }
                    </React.Fragment>
                }
            </React.Fragment>
        }
        </div>
    );
}
export default TableListing
