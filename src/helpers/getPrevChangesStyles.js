const getPrevChangesStyles = (current, previous) => {
  if (!current && previous) {
    return { value: previous, class: 'prev-result' }
  }
  if (current && previous) {
    const difference = current - previous;
    return {
      value: `${difference !== 0 ? (difference > 0 ? '+' : '') + difference : ''}`,
      class: 'prev-result__grow',
      color: difference > 0 ? 'green' : difference < 0 ? 'red' : 'rgb(191 196 203)'
    }
  }
  return { value: current, class: '' }
}

export { getPrevChangesStyles }
