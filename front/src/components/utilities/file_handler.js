import React, { Component } from 'react'
import {axios} from "../../utilities/axios";
import { CSVReader, readString } from 'react-papaparse'

export default class FileHandler extends Component {
  handleOnDrop = (data) => {
    let headers  = []
    let result = []

    data.forEach((item, i) => {//prepare data for posting to database
        if(i==0){//if first row, extract headers
            item.data.forEach((item, i) => {
              headers.push(item)
            });
        }else{//match data with headers
            if(item.data[0]!=''){//does not prepare empty lines
              let temp={}
              headers.forEach((h, i) => {//dynamically create JSON data
                if(typeof item.data[i] == 'number'){
                  temp[headers[i]]=Number(item.data[i])
                  console.log(typeof item.data[i])
                }else{
                  temp[headers[i]]=item.data[i]
                }
              });
              result.push(temp)
            }
        }
    });
    //result.pop()
    console.log('Original',data,result)
    // axios.post(this.props.api,result)
    //   .then((res) => {
    //       console.log('file uploaded '+res);
    //       })
    //   .catch((err) => {
    //     console.log('error '+err);
    //     });
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
    return (
      <CSVReader
        onDrop={this.handleOnDrop}
        onError={this.handleOnError}
        noClick
        addRemoveButton
        onRemoveFile={this.handleOnRemoveFile}
        configOptions={{
            header: true,
            skipEmptyLines: 'greedy',
            step: function(row) { /* Stream */
              console.log("Row:", row.data);
            },
          }}
      >
        <span>Drop CSV file here to upload.</span>
      </CSVReader>
    )
  }
}
