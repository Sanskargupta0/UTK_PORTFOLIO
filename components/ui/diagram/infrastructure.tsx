"use client";

import { Cuboid, Cylinder, IsoStory, Line, mark, type IsoNode, type IsoScene, type ObjProps } from "./iso";

// These logical walkthroughs reuse the reference portfolio's projection,
// platforms, scenario controls, viewport playback and animated SVG paths.
// They illustrate responsibilities, rather than disclose a production topology.
const Request = ({ p, tint }: ObjProps) => (
  <g>
    <Cuboid p={p} at={[-0.8, -0.9, 0]} size={[1.6, 1.8, 0.16]} tint={tint} />
    {[-0.5, 0, 0.5].map(y => <Line key={y} p={p} a={[-0.5,y,0.17]} b={[0.5,y,0.17]} className={mark(tint)} />)}
  </g>
);
const Service = ({ p, tint }: ObjProps) => (
  <g>
    <Cuboid p={p} at={[-0.8,-0.7,0]} size={[1.6,1.4,1.3]} tint={tint} />
    {[0.4,0.85].map(z => <Line key={z} p={p} a={[-0.8,0.7,z]} b={[0.8,0.7,z]} className={mark(tint)} />)}
  </g>
);
const Gpu = ({ p, tint }: ObjProps) => (
  <g>
    <Cuboid p={p} at={[-1,-0.85,0]} size={[2,1.7,0.2]} tint={tint}/>
    <Cuboid p={p} at={[-0.45,-0.4,0.2]} size={[0.9,0.8,0.4]} tint={tint}/>
    {[-0.6,-0.2,0.2,0.6].map(x=><g key={x}><Line p={p} a={[x,-1.1,0.15]} b={[x,-0.85,0.15]} className={mark(tint)}/><Line p={p} a={[x,0.85,0.15]} b={[x,1.1,0.15]} className={mark(tint)}/></g>)}
  </g>
);
const Queue = ({ p,tint }: ObjProps) => <g>{[0,1,2].map(i=><Cuboid key={i} p={p} at={[-0.95+i*0.6,-0.65,0.12*i]} size={[0.45,1.3,0.7]} tint={tint}/>)}</g>;
const Pods = ({ p,tint }: ObjProps) => <g>{[[-0.85,-0.85],[0.15,-0.85],[-0.85,0.15],[0.15,0.15]].map(([x,y],i)=><Cuboid key={i} p={p} at={[x,y,0]} size={[0.7,0.7,0.8]} tint={tint}/>)}</g>;
const Store = ({ p,tint }: ObjProps) => <Cylinder p={p} r={0.8} h={1.3} bands={[0.4,0.85]} tint={tint}/>;
const Metrics = ({ p,tint }: ObjProps) => <g>{[0.5,1.2,0.8].map((h,i)=><Cuboid key={i} p={p} at={[-0.9+i*0.6,-0.5,0]} size={[0.4,1,h]} tint={tint}/>)}</g>;

type NodeId = "request"|"control"|"capacity"|"runtime"|"worker"|"state"|"observe";
type EdgeId = "request-control"|"control-capacity"|"capacity-runtime"|"runtime-worker"|"worker-state"|"state-observe"|"observe-control";
type Positions=Record<NodeId,[number,number]>;
type Spec = [string,string,IsoNode["Obj"]];
function nodes(spec:Record<NodeId,Spec>,positions:Positions):Record<NodeId,IsoNode>{
  return Object.fromEntries(Object.entries(spec).map(([key,[title,sub,Obj]])=>[key,{x:positions[key as NodeId][0],y:positions[key as NodeId][1],title,sub,Obj,size:2.6}])) as Record<NodeId,IsoNode>;
}
// Four independently composed topologies: resource pool, control/execution lanes,
// deployment lanes, and an asynchronous fan-out. Only the drawing primitives are shared.
const gpuPositions:Positions={request:[70,90],control:[240,90],capacity:[455,90],runtime:[525,250],worker:[365,250],state:[205,250],observe:[65,250]};
const gpuEdges={
 'request-control':{d:'M70 90H240'},'control-capacity':{d:'M240 90H455',stop:[365,90] as [number,number]},
 'capacity-runtime':{d:'M455 90Q525 90 525 250'},'runtime-worker':{d:'M525 250H365'},
 'worker-state':{d:'M365 250H205'},'state-observe':{d:'M205 250H65'},'observe-control':{d:'M65 250V180H240V90'},
};
const workerPositions:Positions={request:[70,95],control:[255,95],capacity:[470,95],runtime:[470,240],worker:[255,240],state:[255,395],observe:[70,395]};
const workerEdges={
 'request-control':{d:'M70 95H255'},'control-capacity':{d:'M255 95H470'},'capacity-runtime':{d:'M470 95V240'},
 'runtime-worker':{d:'M470 240H255'},'worker-state':{d:'M255 240V395'},'state-observe':{d:'M255 395H70'},
 'observe-control':{d:'M70 395V185H255V95'},
};
const deployPositions:Positions={request:[70,80],control:[240,80],capacity:[460,80],runtime:[460,220],worker:[460,365],state:[150,365],observe:[150,220]};
const deployEdges={
 'request-control':{d:'M70 80H240'},'control-capacity':{d:'M240 80H460'},'capacity-runtime':{d:'M460 80V220'},
 'runtime-worker':{d:'M460 220V365'},'worker-state':{d:'M460 365H150'},'state-observe':{d:'M150 365V220'},
 'observe-control':{d:'M150 220H240V80'},
};
const eventPositions:Positions={request:[60,165],control:[190,165],capacity:[325,165],runtime:[490,75],worker:[490,270],state:[325,390],observe:[80,390]};
const eventEdges={
 'request-control':{d:'M60 165H190'},'control-capacity':{d:'M190 165H325'},'capacity-runtime':{d:'M325 165C405 165 405 75 490 75'},
 'runtime-worker':{d:'M490 75C570 75 570 270 490 270'},'worker-state':{d:'M490 270Q490 390 325 390'},
 'state-observe':{d:'M325 390H80'},'observe-control':{d:'M80 390V300H190V165'},
};
const order:NodeId[]=["request","control","capacity","observe","runtime","state","worker"];
const allDim:Record<NodeId,"dim">={request:"dim",control:"dim",capacity:"dim",runtime:"dim",worker:"dim",state:"dim",observe:"dim"};
const allGood:Record<NodeId,"ok">={request:"ok",control:"ok",capacity:"ok",runtime:"ok",worker:"ok",state:"ok",observe:"ok"};
const fullPath:Record<EdgeId,"ok">={"request-control":"ok","control-capacity":"ok","capacity-runtime":"ok","runtime-worker":"ok","worker-state":"ok","state-observe":"ok","observe-control":"ok"};
type Scene=IsoScene<NodeId,EdgeId>;

function GpuPool(step:number,still:boolean){
  const claimed=step===1||step===3;
  return <g data-illustration="gpu-capacity-pool">
    <text x="330" y="158" className="fill-muted-foreground text-[8px]">DEVICE CLAIMS / EXCLUSIVE ALLOCATION</text>
    {[0,1,2,3].map(i=><g key={i}>
      <rect x={335+i*43} y={167} width={32} height={27} rx={3} className={step===2?'fill-rose-500/10 stroke-rose-500/60':claimed&&i<2?'fill-current/20 stroke-current':'fill-background stroke-border'} />
      <text x={351+i*43} y={184} textAnchor="middle" className="fill-muted-foreground text-[8px]">{step===2?'busy':claimed&&i<2?'claim':'free'}</text>
      {claimed&&i<2&&!still&&<rect x={336+i*43} y={168} width={30} height={25} rx={3} fill="none" stroke="currentColor"><animate attributeName="opacity" values="0.2;1;0.2" dur={`${1.6+i*.4}s`} repeatCount="indefinite"/></rect>}
    </g>)}
  </g>;
}

function WorkerLanes(step:number,still:boolean){
  return <g data-illustration="worker-dispatch-lanes">
    <path d="M22 170H570M22 325H570" className="stroke-border" strokeDasharray="3 5"/>
    <text x="25" y="158" className="fill-muted-foreground text-[8px]">CONTROL PLANE / DESIRED WORK</text>
    <text x="365" y="310" className="fill-muted-foreground text-[8px]">EXECUTION / INDEPENDENT WORKERS</text>
    <text x="350" y="447" className="fill-muted-foreground text-[8px]">RESULTS / RECONCILIATION</text>
    {[0,1,2].map(i=><g key={i} transform={`translate(340 ${205+i*25})`}>
      <rect width={34} height={14} rx={2} className={step===3&&i===1?'stroke-rose-500 fill-rose-500/10':'stroke-current/50 fill-current/10'}/>
      <text x={17} y={10} textAnchor="middle" className="fill-muted-foreground text-[7px]">job {i+1}</text>
      {!still&&step===1&&<animateTransform attributeName="transform" type="translate" values={`450 ${205+i*25};315 ${205+i*25};315 ${205+i*25}`} dur={`${2+i*.35}s`} begin={`${i*.3}s`} repeatCount="indefinite"/>}
      {!still&&step===3&&i===1&&<animateTransform attributeName="transform" type="translate" values="340 230;360 230;340 230" dur="1.4s" repeatCount="indefinite"/>}
    </g>)}
  </g>;
}

function DeploymentLanes(step:number,still:boolean){
  const healthy=step===2||step===4;
  return <g data-illustration="rolling-release-readiness-gate">
    <rect x="270" y="156" width="280" height="250" rx="8" className="fill-current/2 stroke-border" strokeDasharray="4 4"/>
    <text x="282" y="175" className="fill-muted-foreground text-[8px]">KUBERNETES / ROLLING RELEASE</text>
    <text x="280" y="230" className="fill-muted-foreground text-[8px]">STABLE</text>
    <text x="280" y="306" className="fill-muted-foreground text-[8px]">CANDIDATE</text>
    {[0,1,2].map(i=><g key={i}>
      <rect x={280+i*32} y={241} width={22} height={18} rx={2} className={healthy?'stroke-muted-foreground/25 fill-background':'stroke-current/60 fill-current/10'}/>
      <rect x={280+i*32} y={317} width={22} height={18} rx={2} className={step===3?'stroke-rose-500 fill-rose-500/10':healthy?'stroke-current fill-current/15':'stroke-border fill-background'}>
        {!still&&step===1&&<animate attributeName="opacity" values="0.15;1;1" dur="2.4s" begin={`${i*.6}s`} repeatCount="indefinite"/>}
      </rect>
    </g>)}
    <path d={healthy?'M280 340V365H190':'M280 250H230V365H190'} fill="none" className="stroke-current/60" strokeWidth="1.5"/>
    <text x="286" y="388" className={step===3?'fill-rose-500 text-[8px]':'fill-muted-foreground text-[8px]'}>{step===3?'READINESS GATE CLOSED':healthy?'TRAFFIC → HEALTHY RELEASE':'TRAFFIC → STABLE RELEASE'}</text>
  </g>;
}

function EventFanout(step:number,still:boolean){
  return <g data-illustration="concurrent-consumers-and-acknowledgement">
    {[0,1,2].map(i=>{
      const y=220+i*28;
      return <g key={i}>
        <path d={`M325 165Q370 ${y} 410 ${y}`} className={step===2&&i===1?'stroke-rose-500/60':'stroke-current/40'} fill="none" strokeDasharray={step===2&&i===1?'3 3':undefined}/>
        <rect x="410" y={y-8} width="30" height="17" rx="2" className={step===2&&i===1?'fill-rose-500/10 stroke-rose-500':'fill-current/10 stroke-current/50'}/>
        <text x="425" y={y+3} textAnchor="middle" className="fill-muted-foreground text-[7px]">go {i+1}</text>
        {!still&&(step===1||step===2)&&<circle r="3" className={step===2&&i===1?'fill-rose-500':'fill-current'}>
          <animateMotion path={step===2&&i===1?`M410 ${y}Q360 ${y} 325 165`:`M325 165Q370 ${y} 410 ${y}`} dur={`${1.7+i*.45}s`} repeatCount="indefinite"/>
        </circle>}
      </g>;
    })}
    <text x="265" y="334" className="fill-muted-foreground text-[8px]">{step===2?'NACK / REQUEUE':'FAN-OUT / CONCURRENT CONSUMERS'}</text>
    {step===3&&<g><path d="M325 390H195V335H80V390" fill="none" className="stroke-current"/><text x="110" y="328" className="fill-current text-[8px]">CACHE HIT / SHORTER DATA PATH</text></g>}
  </g>;
}

const gpuNodes=nodes({
  request:["GPU workload","resource request",Request],
  control:["Scheduler","placement decision",Service],
  capacity:["GPU inventory","available capacity",Gpu],
  runtime:["Kubernetes","pod lifecycle",Pods],
  worker:["GPU worker","assigned workload",Gpu],
  state:["Allocation state","claim / release",Store],
  observe:["Health signals","reconcile state",Metrics],
},gpuPositions);
const gpuScenes:Scene[]=[
  {label:"Request",caption:"A workload declares its resource requirements. The scheduler checks available GPU capacity before placing it.",nodes:{...allDim,request:"ok",control:"ok",capacity:"ok"},edges:{"request-control":"ok","control-capacity":"ok"},pills:{request:{text:"GPU requested",tone:"ok"}}},
  {label:"Allocate",caption:"Available capacity is claimed and the workload moves into a Kubernetes-managed pod. Allocation state follows the running worker.",nodes:{...allGood,observe:"dim"},edges:{...fullPath,"state-observe":"idle","observe-control":"idle"},pills:{worker:{text:"allocated",tone:"ok"}}},
  {label:"Capacity",caption:"In this capacity-pressure scenario, the request stays pending instead of starting without the required GPU resources.",nodes:{...allDim,request:"ok",control:"ok",capacity:"bad"},edges:{"request-control":"ok","control-capacity":"bad"},pills:{capacity:{text:"no free capacity",tone:"bad"},control:{text:"pending",tone:"muted"}}},
  {label:"Recover",caption:"A representative failure path: health signals trigger reconciliation so the scheduler can recover a worker and update its allocation state.",nodes:{...allGood,worker:"bad"},edges:{...fullPath,"runtime-worker":"bad","observe-control":"replay"},pills:{worker:{text:"worker unhealthy",tone:"bad"},observe:{text:"reconcile",tone:"ok"}}},
  {label:"Release",caption:"When the workload ends, its allocation is released and the inventory becomes available for subsequent work.",nodes:{...allDim,worker:"ok",state:"ok",observe:"ok",control:"ok",capacity:"ok"},edges:{"worker-state":"ok","state-observe":"ok","observe-control":"ok","control-capacity":"replay"},pills:{state:{text:"claim released",tone:"ok"},capacity:{text:"available",tone:"ok"}}},
];
export function GpuAllocationFlow(){return <IsoStory tone="text-sky-500" h={350} label="GPU allocation walkthrough" nodes={gpuNodes} order={order} edges={gpuEdges} illustration={GpuPool} scenes={gpuScenes}/>;}

const workerNodes=nodes({
  request:["Cloud operation","requested action",Request],control:["Go control plane","orchestration",Service],capacity:["Job queue","scheduled work",Queue],runtime:["Container runtime","Docker images",Service],worker:["Worker pods","Kubernetes",Pods],state:["Operation state","progress / result",Store],observe:["Health signals","worker lifecycle",Metrics],
},workerPositions);
const workerScenes:Scene[]=[
  {label:"Schedule",caption:"A cloud operation enters the control plane, which separates orchestration from execution and schedules the work.",nodes:{...allDim,request:"ok",control:"ok",capacity:"ok"},edges:{"request-control":"ok","control-capacity":"ok"},pills:{capacity:{text:"scheduled",tone:"ok"}}},
  {label:"Dispatch",caption:"The runtime starts the required container and hands the operation to a worker pod. The control plane tracks execution separately.",nodes:{...allDim,capacity:"ok",runtime:"ok",worker:"ok",state:"ok"},edges:{"capacity-runtime":"ok","runtime-worker":"ok","worker-state":"ok"},pills:{worker:{text:"running",tone:"ok"}}},
  {label:"Observe",caption:"Worker health and operation progress feed back into orchestration, supporting lifecycle management and operational visibility.",nodes:{...allGood,request:"dim"},edges:{...fullPath,"request-control":"idle","observe-control":"replay"},pills:{observe:{text:"health + progress",tone:"ok"}}},
  {label:"Retry",caption:"This recovery scenario illustrates a failed worker being detected and its work made eligible for another execution attempt.",nodes:{...allGood,worker:"bad"},edges:{...fullPath,"runtime-worker":"bad","observe-control":"replay"},pills:{worker:{text:"execution failed",tone:"bad"},capacity:{text:"retry eligible",tone:"muted"}}},
  {label:"Complete",caption:"The completed operation records its result and closes the loop with the control plane.",nodes:{...allDim,worker:"ok",state:"ok",observe:"ok",control:"ok"},edges:{"worker-state":"ok","state-observe":"ok","observe-control":"ok"},pills:{state:{text:"completed",tone:"ok"}}},
];
export function WorkerOrchestrationFlow(){return <IsoStory tone="text-amber-500" h={470} label="Cloud worker orchestration walkthrough" nodes={workerNodes} order={order} edges={workerEdges} illustration={WorkerLanes} scenes={workerScenes}/>;}

const deployNodes=nodes({
  request:["Code change","service version",Request],control:["Container build","Docker image",Service],capacity:["Image registry","versioned artifact",Store],runtime:["Deployment","Kubernetes rollout",Pods],worker:["Service pods","readiness",Service],state:["Service route","healthy endpoints",Queue],observe:["Health checks","release feedback",Metrics],
},deployPositions);
const deployScenes:Scene[]=[
  {label:"Build",caption:"A service change is packaged into a consistent Docker image. The versioned artifact becomes the input to deployment.",nodes:{...allDim,request:"ok",control:"ok",capacity:"ok"},edges:{"request-control":"ok","control-capacity":"ok"},pills:{capacity:{text:"versioned image",tone:"ok"}}},
  {label:"Roll out",caption:"Kubernetes starts the new workload while managing its pod lifecycle and configured resource requests.",nodes:{...allDim,capacity:"ok",runtime:"ok",worker:"ok"},edges:{"capacity-runtime":"ok","runtime-worker":"ok"},pills:{runtime:{text:"rolling update",tone:"ok"}}},
  {label:"Ready",caption:"A healthy workload becomes eligible for service traffic. Health feedback helps distinguish a started process from a usable service.",nodes:{...allDim,runtime:"ok",worker:"ok",state:"ok",observe:"ok"},edges:{"runtime-worker":"ok","worker-state":"ok","state-observe":"ok"},pills:{worker:{text:"ready",tone:"ok"},state:{text:"traffic enabled",tone:"ok"}}},
  {label:"Unhealthy",caption:"A representative readiness failure: an unhealthy new workload is kept out of the serving path rather than treated as a successful release.",nodes:{...allDim,runtime:"ok",worker:"bad",state:"dim",observe:"ok"},edges:{"runtime-worker":"bad","state-observe":"replay"},pills:{worker:{text:"not ready",tone:"bad"},state:{text:"no new traffic",tone:"muted"}}},
  {label:"Recover",caption:"Health feedback informs remediation or a return to a known-good image. This is a simplified deployment scenario, not a report of a specific production incident.",nodes:{...allGood,request:"dim"},edges:{...fullPath,"request-control":"idle","observe-control":"replay"},pills:{control:{text:"known-good image",tone:"ok"}}},
];
export function ContainerDeploymentFlow(){return <IsoStory tone="text-violet-500" h={440} label="Container deployment and recovery walkthrough" nodes={deployNodes} order={order} edges={deployEdges} illustration={DeploymentLanes} scenes={deployScenes}/>;}

const eventNodes=nodes({
  request:["REST request","incoming operation",Request],control:["Go service","independent service",Service],capacity:["RabbitMQ","asynchronous events",Queue],runtime:["Worker pool","goroutines / channels",Pods],worker:["Consumer","process operation",Service],state:["Database + cache","MongoDB / Redis",Store],observe:["Response","gRPC / Protobuf",Metrics],
},eventPositions);
const eventScenes:Scene[]=[
  {label:"Publish",caption:"Independently deployable Go services accept REST operations and publish asynchronous work through RabbitMQ.",nodes:{...allDim,request:"ok",control:"ok",capacity:"ok"},edges:{"request-control":"ok","control-capacity":"ok"},pills:{capacity:{text:"event queued",tone:"ok"}}},
  {label:"Process",caption:"Concurrent consumers and worker pools process queued work. Goroutines and channels reduce blocking and support throughput.",nodes:{...allDim,capacity:"ok",runtime:"ok",worker:"ok",state:"ok"},edges:{"capacity-runtime":"ok","runtime-worker":"ok","worker-state":"ok"},pills:{runtime:{text:"concurrent workers",tone:"ok"}}},
  {label:"Retry",caption:"A representative fault-tolerance scenario: failed processing is detected and the operation is retried through the asynchronous pipeline.",nodes:{...allDim,capacity:"ok",runtime:"ok",worker:"bad",observe:"ok",control:"ok"},edges:{"capacity-runtime":"ok","runtime-worker":"bad","observe-control":"replay","control-capacity":"replay"},pills:{worker:{text:"processing failed",tone:"bad"},capacity:{text:"retry work",tone:"muted"}}},
  {label:"Cache",caption:"Database optimization and caching shorten the data path. The resume reports a 40% query-latency reduction during the internship.",nodes:{...allDim,worker:"ok",state:"ok",observe:"ok"},edges:{"worker-state":"ok","state-observe":"ok"},pills:{state:{text:"database + cache",tone:"ok"}}},
  {label:"Respond",caption:"Protocol Buffers and gRPC streamline service communication. The resume reports 30 ms lower transaction latency and 40% higher throughput from separate optimization efforts.",nodes:allGood,edges:fullPath,pills:{observe:{text:"Protobuf response",tone:"ok"}}},
];
export function EventPipelineFlow(){return <IsoStory tone="text-emerald-500" h={465} label="RabbitLoader event-driven microservices walkthrough" nodes={eventNodes} order={order} edges={eventEdges} illustration={EventFanout} scenes={eventScenes}/>;}
