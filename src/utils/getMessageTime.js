import { format, parseISO } from "date-fns";
import isToday from "date-fns/isToday";

const getMessageTime = created_at => {
  let date = parseISO(new Date(created_at).toISOString());
    if(isToday(date)) {
        return format( date, 'kk:mm');
    } else {
      return format(date, 'yyyy-LL-dd');
    }
}

export default getMessageTime;
