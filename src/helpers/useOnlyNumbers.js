export const useOnlyNumbers = event => {
  const charCode = event.which ? event.which : event.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    event.preventDefault()
  }
}

export const preventNonNumericPaste = event => {
  const paste = (event.clipboardData || window.clipboardData).getData('text');
  if (!paste.match(/^[0-9]*$/)) {
    event.preventDefault();
  }
}