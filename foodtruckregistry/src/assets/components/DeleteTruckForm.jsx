import { useState } from "react";
import Combobox from "./Combobox";

function DeleteTruckForm({ trucks, deleteTruck }) {
  //State to manage the input field of the business name to be deleted
  const [deleteInput, setDeleteInput] = useState({
    name: "",
  });
  console.log(deleteInput);

  const handleChange = (e) => {
    setDeleteInput((prev) => ({
      ...deleteInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDeletion = (e) => {
    e.preventDefault();
    //Find truck business name in trucks and delete it from the list
    if (!deleteInput.name) {
      return;
    }
    console.log("Deleting marker with name:", deleteInput.name);
    deleteTruck((prev) =>
      prev.filter((truckName) => truckName.name !== deleteInput.name)
    );
  };

  return (
    <form onSubmit={handleDeletion}>
      <Combobox list={trucks} />
      <input type="submit" value="Delete marker" />
    </form>
  );
}
export default DeleteTruckForm;
