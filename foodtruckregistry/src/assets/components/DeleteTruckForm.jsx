import { useState } from "react";
import Combobox from "./Combobox";

function DeleteTruckForm({ trucks, deleteTruck }) {
  const [truckToDelete, setTruckToDelete] = useState("");
  const [deleteInput, setDeleteInput] = useState({
    name: "",
  });
  console.log(deleteInput);

  // const handleChange = (e) => {
  //   setDeleteInput((prev) => ({
  //     ...deleteInput,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleDeletion = (e) => {
    e.preventDefault();
    if (!deleteInput) {
      return;
    }

    //Find truck business name in trucks and delete it from the list
    console.log("Deleting marker with name:", deleteInput);
    deleteTruck((prev) =>
      prev.filter((truckName) => truckName.name !== deleteInput)
    );

    //Clear state values
    setTruckToDelete("");
  };

  return (
    <form onSubmit={handleDeletion}>
      <Combobox
        query={truckToDelete}
        setQuery={setTruckToDelete}
        list={trucks}
        handleSelect={setDeleteInput}
        placeholderText={"Enter foodtruck name..."}
      />
      <input type="submit" value="Delete marker" />
    </form>
  );
}
export default DeleteTruckForm;
