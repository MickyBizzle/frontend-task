import { Box, Center, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { deviceList } from 'api/fetchers'
import { useGetSession } from "hooks/useGetSession";
import { useState, useEffect } from "react";
import { Select } from "components/Select";
import { DeviceResult } from "routes/device/DeviceResult";

const Devices = () => {
  const router = useRouter()
  const { deviceId } = router.query
  const deviceFromUrl = deviceId ? deviceId[0] as string : undefined

  const { userId, orgId } = useGetSession()

  const { data, isValidating } = useSWR([userId, orgId], deviceList)

  const [selectedDevice, setSelectedDevice] = useState<string>('')

  useEffect(() => {
    if (deviceFromUrl) {
      setSelectedDevice(deviceFromUrl)
    }
  }, [deviceFromUrl])

  useEffect(() => { router.push(`/devices/${selectedDevice}`, undefined, { shallow: true }) }, [selectedDevice])


  return (
    <Box bg="white" h="100%" flex={1} p={4} borderRadius={8} shadow="lg">
      <Select placeholder="Select a device" onChange={(e) => setSelectedDevice(e.target.value)} isLoading={isValidating} value={!isValidating ? selectedDevice : ''}>
        {data?.output?.map(device => <option key={device} value={device}>
          {device}
        </option>)}
      </Select>
      <DeviceResult />
    </Box>
  );
}

export default Devices;