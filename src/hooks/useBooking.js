import { useQuery } from "@tanstack/react-query";
import * as bookingApi from '../api/booking.api';

export const useFetchMyBookingListQuery = ({ id, search = null }) => (
  useQuery({
    queryKey: ['booking', id, { search }],
    async queryFn() {
      const searchParams = new URLSearchParams();

      if (search) {
        searchParams.append('type', search.type);
        searchParams.append('date', search.date);
      }

      const response = await bookingApi.fetchMyBookingList(id, searchParams.toString());
      
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    },
    enabled: !!id
  })
);
