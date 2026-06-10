interface LocalStorageAPI<T> {
    getItem(key: string): T | null;
    setItem(key: string, value: T): void;
    clearItem(key: string): void;
    clear(): void;
}

abstract class localStorageAbstract<T> implements LocalStorageAPI<T>{
    constructor(protected storage:Storage){}
    setItem(key:string, value:T): void {
        this.storage.setItem(key, JSON.stringify(value));
    }
    getItem(key:string):T | null{
        const value = this.storage.getItem(key);
        if (value === null) {
            return null;
        }
        return JSON.parse(value) as T;
    }
    clearItem(key:string): void {
        this.storage.removeItem(key);
    }
    clear():void {
        this.storage.clear();
    }
}

class LocalStorage<T> extends localStorageAbstract<T> {
    constructor(){
        super(window.localStorage);
    }
}


const storage = new LocalStorage<string>();
storage.setItem("1","첫번째");
storage.setItem("2","두번째");
storage.setItem("3","세번째");
console.log(storage);
console.log(storage.getItem("3"));

setTimeout(() => {
    storage.clearItem("3");
    console.log(storage);
    storage.clear();
    console.log(storage);
}, 7000); // 7초(7000ms) 후 실행


interface GeolocationAPI {
    getCurrentPosition(successFn:PositionCallback ) : void
    getCurrentPosition(successFn:PositionCallback, errorFn: PositionErrorCallback) : void
    getCurrentPosition(successFn:PositionCallback, errorFn: PositionErrorCallback, options:PositionOptions) : void
    watchPosition(success:PositionCallback):number;
    watchPosition(success:PositionCallback, error:PositionErrorCallback):number;
    watchPosition(success:PositionCallback, error:PositionErrorCallback, options:PositionOptions):number;
    clearWatch(id: number): void;
}

class GeolocationInLocal implements GeolocationAPI{
    getCurrentPosition(successFn:PositionCallback, errorFn?: PositionErrorCallback, options?:PositionOptions) : void {
        navigator.geolocation.getCurrentPosition(successFn, errorFn, options);
    }
    
    watchPosition(success:PositionCallback, error?:PositionErrorCallback, options?:PositionOptions):number{
        return navigator.geolocation.watchPosition(success, error, options);
    }
    clearWatch(id: number): void {
        navigator.geolocation.clearWatch(id);
    }
}
const geoService = new GeolocationInLocal();

// getCurrentPosition
const successCallback = (position: GeolocationPosition) => {
    console.log("📍 [위치 업데이트 수신]");
    console.log(`위도: ${position.coords.latitude}, 경도: ${position.coords.longitude}`);
};

const errorCallback = (error: GeolocationPositionError) => {
    console.error(`❌ 에러 발생: ${error.message}`);
};


geoService.getCurrentPosition(successCallback, errorCallback);


// watchPosition
const myWatchId = geoService.watchPosition(successCallback, errorCallback, {
    enableHighAccuracy: true
});
console.log(`고유 추적 ID 발급 완료: ${myWatchId}`);

// clearWatch
setTimeout(() => {
    console.log(`3️⃣ [clearWatch] 호출 - ID ${myWatchId}번의 추적을 종료합니다.`);
    geoService.clearWatch(myWatchId);
    console.log("🏁 실시간 추적이 정상적으로 종료되었습니다.");
}, 7000); // 7초(7000ms) 후 실행

