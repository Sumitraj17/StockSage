export const DateFormat = async(date)=>{
    const tempDate = new Date(date)
    const day = String(tempDate.getDate()).padStart(2, '0');
    const month = String(tempDate.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = tempDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}