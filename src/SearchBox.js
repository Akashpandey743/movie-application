import React from "react";

const SearchBox = (props) => {
    return (
        <div className="col col-sm-4">
          <form >
             <input
             className="form-control"
               type="text"
                value={props.value}
                onChange={(e) =>props.setSearchValue(e.target.value) 
                }
                placeholder="Type to search..."
              />
            </form>  
        </div>
    )
}

export default SearchBox;