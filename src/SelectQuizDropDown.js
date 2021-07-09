import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function SelectQuizDropDown(){
    const classes = useStyles();
    const age = 0;
    const handleChange = (event) => {
        console.log("")
      };
    return(
        <></>
    )
}
export default SelectQuizDropDown;