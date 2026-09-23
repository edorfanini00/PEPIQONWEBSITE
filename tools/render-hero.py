"""Original IQONIC studio phone hardware. Run with Blender --background --python ... -- --front PNG --rear PNG --output PNG.
No GUI scene is touched. Screens are fitted without cropping or stretching. Outputs packed .blend beside PNG.
"""
import bpy, math, argparse, sys, os
from mathutils import Vector
p=argparse.ArgumentParser()
p.add_argument('--front',required=True); p.add_argument('--rear',required=True)
p.add_argument('--output',required=True); p.add_argument('--samples',type=int,default=64)
p.add_argument('--transparent',action='store_true'); p.add_argument('--preview',action='store_true')
a=p.parse_args(sys.argv[sys.argv.index('--')+1:])
a.output=os.path.abspath(os.path.expanduser(a.output)); os.makedirs(os.path.dirname(a.output),exist_ok=True)
scene=bpy.data.scenes.new('IQONIC original product studio'); bpy.context.window.scene=scene
scene['status']='STAGING PREVIEW — nutrition screenshot, not final' if a.preview else 'Full screenshot product hero'
scene.render.engine='CYCLES'; scene.cycles.samples=a.samples; scene.cycles.use_denoising=True
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences; prefs.compute_device_type='METAL'; prefs.get_devices()
 devices=[]
 for d in prefs.devices:
  d.use=d.type=='METAL'
  if d.use: devices.append(d.name)
 scene.cycles.device='GPU' if devices else 'CPU'; print('RENDER DEVICES',devices or ['CPU'])
except Exception as e: print('Metal unavailable:',e); scene.cycles.device='CPU'
scene.render.resolution_x=1200; scene.render.resolution_y=1300; scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG'; scene.render.image_settings.color_mode='RGBA'; scene.render.film_transparent=a.transparent
scene.render.filepath=a.output; scene.view_settings.view_transform='Standard'
scene.view_settings.look='None'; scene.view_settings.exposure=0; scene.view_settings.gamma=1
world=bpy.data.worlds.new('Graphite studio'); world.use_nodes=True; world.node_tree.nodes['Background'].inputs[0].default_value=(.035,.038,.042,1); world.node_tree.nodes['Background'].inputs[1].default_value=.3; scene.world=world

def mat(name,c,metal=0,rough=.3):
 m=bpy.data.materials.new(name); m.use_nodes=True; s=m.node_tree.nodes.get('Principled BSDF'); s.inputs['Base Color'].default_value=(*c,1); s.inputs['Metallic'].default_value=metal; s.inputs['Roughness'].default_value=rough; return m
metal=mat('Satin graphite titanium',(.13,.145,.16),.88,.26)
edge=mat('Precision polished titanium chamfer',(.35,.38,.41),.94,.19)
black=mat('Obsidian ceramic bezel',(.003,.004,.005),.25,.22)
button=mat('Machined side controls',(.21,.23,.25),.9,.23)
ground=mat('Graphite seamless stage',(.0052,.0056,.006),.12,.38)

def contour(w,h,r,n=16):
 out=[]
 for cx,cz,start in [(w/2-r,h/2-r,0),(-w/2+r,h/2-r,90),(-w/2+r,-h/2+r,180),(w/2-r,-h/2+r,270)]:
  for j in range(n+1):
   t=math.radians(start+j*90/n); out.append((cx+r*math.cos(t),cz+r*math.sin(t)))
 return out

def solid(name,w,h,r,depth,y,material,parent):
 pts=contour(w,h,r); n=len(pts); verts=[(x,y+dy,z) for dy in [-depth/2,depth/2] for x,z in pts]
 faces=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
 mesh=bpy.data.meshes.new(name); mesh.from_pydata(verts,[],faces); mesh.update(); ob=bpy.data.objects.new(name,mesh); scene.collection.objects.link(ob); ob.parent=parent; mesh.materials.append(material)
 bevel=ob.modifiers.new('Micro radius precision edge','BEVEL'); bevel.width=.025; bevel.segments=3
 norm=ob.modifiers.new('Weighted studio normals','WEIGHTED_NORMAL'); return ob

def screen(name,path,parent):
 image=bpy.data.images.load(os.path.abspath(os.path.expanduser(path)),check_existing=True); image.pack()
 w,h=2.64,2.64*844/390; aspect=image.size[0]/image.size[1]
 # Contain entire source in target aperture. Final 390x844 screenshots fit edge-to-edge.
 sw=min(w,h*aspect); sh=sw/aspect
 pts=contour(sw,sh,min(.19,sw*.08),24); verts=[(0,-.171,0)]+[(x,-.171,z) for x,z in pts]; n=len(pts)
 faces=[(0,i+1,(i+1)%n+1) for i in range(n)]
 mesh=bpy.data.meshes.new(name); mesh.from_pydata(verts,[],faces); mesh.update(); uv=mesh.uv_layers.new(name='Faithful full screenshot UV')
 for poly in mesh.polygons:
  for li in poly.loop_indices:
   v=mesh.vertices[mesh.loops[li].vertex_index].co; uv.data[li].uv=(v.x/sw+.5,v.z/sh+.5)
 ob=bpy.data.objects.new(name,mesh); scene.collection.objects.link(ob); ob.parent=parent
 m=bpy.data.materials.new(name+' unaltered sRGB display'); m.use_nodes=True; nodes=m.node_tree.nodes; nodes.clear()
 tex=nodes.new('ShaderNodeTexImage'); tex.image=image; tex.interpolation='Linear'; em=nodes.new('ShaderNodeEmission'); em.inputs['Strength'].default_value=.85; out=nodes.new('ShaderNodeOutputMaterial'); m.node_tree.links.new(tex.outputs['Color'],em.inputs['Color']); m.node_tree.links.new(em.outputs[0],out.inputs['Surface']); mesh.materials.append(m)
 ob['source_dimensions']=list(image.size); ob['fit']='contain, full image UV, no crop, no stretch'

def phone(name,path,loc,rot):
 parent=bpy.data.objects.new(name,None); scene.collection.objects.link(parent); parent.location=loc; parent.rotation_euler=tuple(math.radians(v) for v in rot)
 solid(name+' titanium unibody',2.84,5.94,.35,.25,0,metal,parent)
 solid(name+' front diamond edge',2.80,5.90,.33,.022,-.129,edge,parent)
 solid(name+' inset black bezel',2.75,5.85,.31,.022,-.148,black,parent)
 screen(name+' screen',path,parent)
 for label,z,hh in [('volume up',1.1,.38),('volume down',.56,.38)]:
  ob=solid(name+' '+label,.045,hh,.02,.10,0,button,parent); ob.location=(-1.435,0,z)
 ob=solid(name+' power key',.045,.66,.02,.10,0,button,parent); ob.location=(1.435,0,.7)
 # Tiny earpiece lives in hardware margin, never overlays app content.
 ob=solid(name+' earpiece',.45,.021,.010,.009,-.166,black,parent); ob.location.z=2.902
 return parent
phone('02 rear companion',a.rear,(-1.23,.74,3.08),(0,-7,-13))
phone('01 primary hero',a.front,(1.01,-.48,3.08),(0,4,7))
mesh=bpy.data.meshes.new('Infinite studio ground'); mesh.from_pydata([(-200,-200,0),(200,-200,0),(200,200,0),(-200,200,0)],[],[(0,1,2,3)]); mesh.materials.append(ground)
ob=bpy.data.objects.new('Grounded soft contact shadows',mesh); scene.collection.objects.link(ob)
if a.transparent: ob.is_shadow_catcher=True
else:
 # Seamless curved sweep prevents a world/ground horizon at the top edge.
 sweep=[(8,0)]+[(8+6*math.sin(i*math.pi/64),6-6*math.cos(i*math.pi/64)) for i in range(1,33)]+[(14,80)]
 verts=[(x,y,z) for y,z in sweep for x in (-200,200)]
 faces=[(2*i,2*i+1,2*i+3,2*i+2) for i in range(len(sweep)-1)]
 me=bpy.data.meshes.new('Seamless cyclorama'); me.from_pydata(verts,[],faces); me.materials.append(ground)
 for face in me.polygons: face.use_smooth=True
 cyc=bpy.data.objects.new('Seamless cyclorama',me); scene.collection.objects.link(cyc)

def area(name,loc,power,size,color,target=(0,0,3),size_y=None):
 data=bpy.data.lights.new(name,'AREA'); data.energy=power; data.color=color; data.shape='RECTANGLE'; data.size=size; data.size_y=size_y or size
 ob=bpy.data.objects.new(name,data); scene.collection.objects.link(ob); ob.location=loc; ob.rotation_euler=(Vector(target)-ob.location).to_track_quat('-Z','Y').to_euler()
area('Left tall softbox',(-5,-3,7),650,3,(.86,.91,1),size_y=8)
area('Right titanium strip',(6,1,5),900,2,(1,.98,.94),size_y=7)
area('Top edge definition',(0,3,9),750,4,(.88,.93,1),size_y=3)
area('Gentle front fill',(0,-7,6),100,5,(1,1,1))
cam=bpy.data.cameras.new('Editorial portrait camera'); ob=bpy.data.objects.new('Editorial portrait camera',cam); scene.collection.objects.link(ob); ob.location=(2,-19,8); target=Vector((.0,0,3.0)); ob.rotation_euler=(target-ob.location).to_track_quat('-Z','Y').to_euler(); cam.lens=68; scene.camera=ob
scene['design']='Original two-device machined titanium hardware; no external model assets; no physical medical props'
bpy.ops.wm.save_as_mainfile(filepath=os.path.splitext(a.output)[0]+'.blend')
bpy.ops.render.render(write_still=True,scene=scene.name)
print('IQONIC_RENDER_COMPLETE',a.output)
