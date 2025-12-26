import { queryClient } from '../providers/AppProvider';

export interface CacheEditOptions {
  item: any;
  type: 'edit' | 'add' | 'delete';
  cacheKey: string;
}

export const handleEditCache = function ({ item, type, cacheKey }: CacheEditOptions) {
  queryClient.setQueriesData({ queryKey: [cacheKey] }, (oldData: any) => {
    let newData = [] as any;
    
    if (type === 'edit') {
      newData = oldData?.map((itm: any) => {
        if (itm.id === item.id) {
          return item;
        }
        return itm;
      });
    } else if (type === 'add') {
      newData = oldData ? [item, ...oldData] : [item];
    } else if (type === 'delete') {
      newData = oldData?.filter((itm: any) => itm.id !== item.id);
    }

    return newData;
  });
};

export const handleSingleEditCache = function ({ item, cacheKey }: { item: any; cacheKey: string }) {
  queryClient.setQueriesData({ queryKey: [cacheKey] }, () => {
    return item;
  });
};
