import axios from 'axios';
import { CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';

export default function TakePhoto() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
    const [cameraType, setCameraType] = useState<CameraType>('back');

    useEffect(() => {
        if (!permission || !permission.granted) requestPermission();
    })

    const takePhoto = async () => {
        if (cameraRef.current) {
            try {
                const result = await cameraRef.current.takePictureAsync();

                // Upload to backend
                if (result) {
                    const formData = new FormData();
                    formData.append('photo', {
                        uri: result?.uri,
                        name: 'photo.jpg',
                        type: 'image/jpeg',
                    } as any);

                    console.log(formData);

                    await axios.post('http://192.168.50.239:3000/upload-photo', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                }

                setPhoto(result);
            } catch (e) {
                console.log(e);
                Alert.alert('Error taking photo:', (e as Error).message);
            }
        }
    };

    const toggleCameraType = () => {
        setCameraType((prev) =>
            prev === 'back' ? 'front' : 'back'
        );
    };

    return (
        <View style={styles.container}>
            {
                permission?.granted ? (
                    <>
                        <CameraView
                            ref={cameraRef}
                            style={styles.camera}
                            facing={cameraType}
                        />
                        <View style={styles.buttonRow}>
                            <Button title='Flip Camera' onPress={toggleCameraType} />
                            <Button title='Take Photo' onPress={takePhoto} />
                        </View>
                        {
                            photo && (
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{
                                        width: 200, height: 200, marginTop: 10
                                    }}
                                />
                            )
                        }
                    </>
                ) : (
                    <Button title='Grant Camera Access' onPress={requestPermission} />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    camera: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        aspectRatio: 3 / 4
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    }
})