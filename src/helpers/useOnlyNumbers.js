export const useOnlyNumbers = event => {
  // Allow: . and ,
  if (event.keyCode === 190 || event.keyCode === 188) {
    // Check if the text already contains the .
    if (event.target.value.indexOf('.') !== -1) {
      event.preventDefault()
    }
  }

  const charCode = event.which ? event.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    event.preventDefault()
  }
}
