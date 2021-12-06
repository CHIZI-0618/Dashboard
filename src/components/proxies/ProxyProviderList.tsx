import * as React from 'react';
import { ProxyProvider } from 'src/components/proxies/ProxyProvider';
import { FormattedProxyProvider } from 'src/store/types';

export function ProxyProviderList({
  items,
}: {
  items: FormattedProxyProvider[];
}) {
  if (items.length === 0) return null;

  return (
    <>

      <div>
        {items.map((item) => (
          <ProxyProvider
            key={item.name}
            name={item.name}
            proxies={item.proxies}
            type={item.type}
            vehicleType={item.vehicleType}
            updatedAt={item.updatedAt}
          />
        ))}
      </div>
    </>
  );
}
